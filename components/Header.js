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
            </div>
            <div className="Hamburger_menu">
                <input type="checkbox" id="menu-btn-check" />
                <label htmlFor="menu-btn-check" className="menu-btn">
                    <span></span>
                </label>
                <div className="menu-content">
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Article</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/category">
                                <a>Category</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                header {
                    background: #FF8900;
                    display: flex;
                    justify-content: space-between;
                }
                div {
                    width: 95%;
                    height: 60px;
                    margin: 0 auto;
                    max-width: 1000px;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                }
                .Hamburger_menu {
                    padding-right: 100px;
                    display: flex;
                    align-items: center;
                }
                a {
                    text-decoration: none;
                    color: #000000;
                }
                .menu-content {
                    width: 25%;
                    height: 100%;
                    position: fixed;
                    top: 0;
                    left: 100%;
                    z-index: 80;
                    background-color: #000000;
                    transition: all 0.5s;
                }
                .menu-content ul {
                    padding: 70px 10px 0;
                }
                .menu-content ul li {
                    border-bottom: solid 1px #ffffff;
                    list-style: none;
                }
                .menu-content ul li a {
                    display: block;
                    width: 100%;
                    font-size: 36px;
                    box-sizing: border-box;
                    color:#ffffff;
                    text-decoration: none;
                    padding: 9px 15px 10px 0;
                    position: relative;
                }
                .menu-content ul li a::before {
                    content: "";
                    width: 7px;
                    height: 7px;
                    border-top: solid 2px #ffffff;
                    border-right: solid 2px #ffffff;
                    transform: rotate(45deg);
                    position: absolute;
                    right: 11px;
                    top: 16px;
                }
                .menu-btn {
                    top: 25px;
                    right: 100px;
                    display: flex;
                    height: 60px;
                    width: 60px;
                    border-radius: 50%;
                    justify-content: center;
                    align-items: center;
                    z-index: 90;
                    background-color: #000000;
                }
                .menu-btn span,
                .menu-btn span:before,
                .menu-btn span:after {
                    content: '';
                    display: block;
                    height: 3px;
                    width: 25px;
                    border-radius: 3px;
                    background-color: #ffffff;
                    position: absolute;
                }
                .menu-btn span:before {
                    bottom: 8px;
                }
                .menu-btn span:after {
                    top: 8px;
                }
                #menu-btn-check:checked ~ .menu-btn span {
                    background-color: rgba(255, 255, 255, 0);
                }
                #menu-btn-check:checked ~ .menu-btn span::before {
                    bottom: 0;
                    transform: rotate(45deg);
                }
                #menu-btn-check:checked ~ .menu-btn span::after {
                    top: 0;
                    transform: rotate(-45deg);
                }
                #menu-btn-check {
                    display: none;
                }
                #menu-btn-check:checked ~ .menu-content {
                    left: 75%;
                }
            `}</style>
        </header>
    );
}