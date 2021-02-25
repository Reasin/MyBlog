import Link from 'next/link'

import style from '../styles/Home.module.scss'

import Header from '../components/Header'

export default function Home({ blog }){
    blog.sort(function(a, b){
        if(a.publishedAt > b.publishedAt){
            return -1;
        }else{
            return 1;
        }
    });
    
    return(
        <div className={style.background}>
            <Header />
            <main className={style.main}>
                <h1 className={style.sub_title}>
                    New article
                </h1>                
                {blog.map(blog => (
                    <article key={blog.id} className={style.home_article}>
                        <Link href={`/blog/${blog.id}`}>
                            <h1 className={style.home_title}>
                                <a>{blog.title}</a>
                            </h1>
                        </Link>
                        <p className={style.publishedAt}>
                            投稿日:{blog.publishedAt.substr(0, 10)}    
                        </p>
                        <div className={style.category}>
                            {blog.category.map(category => (
                                <Link key={category.id} href={`/category/${category.name}`}>
                                    <p className={style.category_name}>
                                        {category && `${category.name}`}
                                    </p>
                                </Link>
                            ))}
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
