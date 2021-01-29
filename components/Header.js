import Link from "next/link"
import Head from "next/head"

export default function Header(){
    return(
        <header>
            <Head>
                <title>TechBlog</title>
            </Head>
            <div>
                <Link href="/">
                    <h1>
                        TechBlog    
                    </h1>
                </Link>
                <form>
                    <input type="text" placeholder="Search" />
                </form>
            </div>
            <style jsx>{`
                header {
                    background: #FF8900;
                }
                div {
                    width: 95%;
                    height: 60px;
                    margin: 0 auto;
                    max-width: 1000px;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    justify-content: space-between;
                }
            `}</style>
        </header>
    );
}