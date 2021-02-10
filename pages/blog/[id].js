import Link from 'next/link'

import style from '../../styles/Home.module.scss'
import markdownStyle from '../../styles/markdown.module.scss'

import Header from '../../components/Header'

export default function BlogId({ blog }){
    return(
        <div className={style.background}>
            <Header />
            <main className={style.main}>
                <article className={style.article}>
                    <h1 className={style.title}>
                        {blog.title}
                    </h1>
                    <p className={style.publishedAt}>
                        投稿日: {blog.publishedAt.substr(0, 10)}
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
                    <div 
                    dangerouslySetInnerHTML={{
                        __html: `${blog.body}`
                    }}
                    className={markdownStyle.post}
                    />
                </article>
            </main>
        </div>
    )
}


export const getStaticPaths = async () => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    };
    const data = await fetch('https://techgierblog.microcms.io/api/v1/blog/', key)
    .then(res => res.json())
    .catch(() => null);
    const paths = data.contents.map(content => `/blog/${content.id}`);
    return {paths, fallback: false};
};


export const getStaticProps = async context => {
    const id = context.params.id;
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    };
    const data = await fetch(
        'https://techgierblog.microcms.io/api/v1/blog/' + id,
        key,
    )
    .then(res => res.json())
    .catch(() => null);
    return{
        props:{
            blog: data
        }
    };
};
