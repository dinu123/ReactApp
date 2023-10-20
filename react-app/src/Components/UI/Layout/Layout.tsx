import './layout.css';

const Layout = (props:any) => {
    return (
        <section className="layout">
            <div className='child-container'>{props.children}</div>
        </section>
    )
}
export default Layout;