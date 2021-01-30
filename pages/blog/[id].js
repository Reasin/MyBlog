import style from '../../styles/Home.module.scss'

import Header from '../../components/Header'

export default function BlogId({ blog }){
    const publishedAt = blog.publishedAt.substr(0, 10) //日付までの出力にしました。
    return(
        <div className={style.background}>
            <Header />
            <main className={style.main}>
                <h1 className={style.title}>
                    {blog.title}
                </h1>
                <div className={style.category_publishedAt}>
                    <p className={style.category}>
                        {blog.category && `${blog.category.name}`}
                    </p>
                    <p className={style.publishedAt}>
                        {publishedAt}
                    </p>
                </div>
                <div 
                dangerouslySetInnerHTML={{
                    __html: `${blog.body}`
                }}
                className={style.post}
                />
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
