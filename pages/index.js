import Link from 'next/link'

import style from '../styles/Home.module.scss'

import Header from '../components/Header'

export default function Home({ blog }){
    return(
        <div className={style.background}>
            <Header />
            <main className={style.main}>
                {blog.map(blog => (
                    <article key={blog.id} className={style.article}>
                        <Link href={`/blog/${blog.id}`}>
                            <h1 className={style.home_title}>
                                {blog.title}
                            </h1>
                        </Link>
                        <div className={style.home_category_publishedAt}>
                            <p>
                                {blog.category && `${blog.category.name}`}
                            </p>
                            <p>
                                {blog.publishedAt.substr(0, 10)}
                            </p>
                        </div>
                    </article>
                ))}
            </main>
        </div>
    );
}


export const getStaticProps = async() => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    };
    const data = await fetch('https://techgierblog.microcms.io/api/v1/blog/', key)
    .then(res => res.json())
    .catch(() => null);
    return {
        props: {
            blog: data.contents
        }
    };
}
