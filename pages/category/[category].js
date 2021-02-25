import { useRouter } from 'next/router'
import Link from 'next/link'

import Header from '../../components/Header'

import style from '../../styles/Home.module.scss'

export default function CategoryId({ blog }){
    const router = useRouter()
    const {category} = router.query
    const filter_category = Array()
    for(let blogset = 0; blogset < blog.length; blogset++){
        for(let categoryset = 0; categoryset < blog[blogset].category.length; categoryset++){
            if(blog[blogset].category[categoryset].name === {category}.category){     
                filter_category.push(blog[blogset])
            }
        }
    }
    return(
        <>
            <div className={style.background}>
                <Header />
                <main className={style.main}>
                    <h1 className={style.sub_title}>
                        カテゴリー：{category}
                    </h1>
                    {filter_category.map(blog => (
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
        </>
    )
}

export const getStaticPaths = async () => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    };
    const data = await fetch('https://techgierblog.microcms.io/api/v1/categories', key)
    .then(res => res.json())
    .catch(() => null);
    const paths = data.contents.map(contents => `/category/${contents.name}`);
    return {paths, fallback: false};
};

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
