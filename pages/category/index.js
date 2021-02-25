import Link from 'next/link'

import Header from "../../components/Header";

import style from '../../styles/Home.module.scss'

export default function CategoryIndex ({ category }){
    return(
        <>
            <div className={style.background}>
                <Header />
                <main className={style.main}>
                    <h1 className={style.sub_title}>
                        登録されているカテゴリー
                    </h1>
                    <article className={style.home_article}>
                    {category.map(category => (
                        <Link key={category.id} href={`/category/${category.name}`}>
                            <p className={style.category_name}>
                                {category.name}
                            </p>
                        </Link>
                    ))}
                    </article>
                </main>
            </div>
            <style jsx>{`
                article {
                    display: flex;
                    flex-wrap: wrap;
                    align-content: stretch;
                }
                article p {
                    width: 25%;
                }
            `}</style>
        </>
    )
}

export const getStaticProps = async() => {
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY}
    };
    const data = await fetch('https://techgierblog.microcms.io/api/v1/categories', key)
    .then(res => res.json())
    .catch(() => null);
    return {
        props: {
            category: data.contents
        }
    };
}

