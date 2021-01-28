import style from '../../styles/Home.module.scss'

export default function BlogId({ blog }){
    return(
        <main className={style.main}>
            <h1 className={style.title}>
                {blog.title}
            </h1>
            <p className={style.publishedAt}>
                {blog.publishedAt}
            </p>
            <div 
            dangerouslySetInnerHTML={{
                __html: `${blog.body}`
            }}
            className={style.post}
            />
        </main>
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
