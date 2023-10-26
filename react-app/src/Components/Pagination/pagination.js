import './pagination.css';
const CustomPagination = (props) => {
    const {maxPages , onClickHandler,acivePageNumber} = props;
    const buttonArray = [];
    for(let i=0;i<maxPages;i++) {
        buttonArray.push( <li className={acivePageNumber === i ? 'active':''} onClick = {() => {
            onClickHandler(i)
        }}>
            <a>{i+1}</a>
        </li>)
    }
return (
    <div className="pagination-container">
        <ul>
          {buttonArray} 
        </ul>
    </div>
)
}

export default CustomPagination;