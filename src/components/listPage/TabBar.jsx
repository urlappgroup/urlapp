
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import allList from '@/data/appList.json';

//使用orderList对stringlist排序,如果一个string在orderList,就按照orderList的顺序,如果string不在orderList,就保持原有顺序,放在匹配orderList的列表后面
function sortByOrderList(stringList, orderList) {
    // 创建一个索引map，用于保存orderList中元素的位置
    const indexMap = new Map();
    orderList.forEach((item, index) => {
        indexMap.set(item, index);
    });

    // 定义比较函数
    const compareFn = (a, b) => {
        let bigInt = 10000000
        const aIndex = indexMap.has(a) ? indexMap.get(a) : bigInt; // 不在orderList中的元素给一个很大的索引值
        const bIndex = indexMap.has(b) ? indexMap.get(b) : bigInt; // 同上
        return aIndex - bIndex; // 如果两者都在orderList中，则按照orderList的顺序排列=
    };

    // 使用slice()拷贝原数组，然后用sort()方法排序
    return stringList.slice().sort(compareFn);
}

const TabBar = ({ curTag,curMark }) => {
    curTag=curTag?curTag:"all"
    curMark=curMark?curMark:"all"
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    };
    let newTags = [... new Set(allList.map(item => item.tag))]
    let tagOrder = ["文档"]
    let sortedTags = sortByOrderList(newTags, tagOrder)

    let newMarks = [... new Set(allList.filter(item => !curTag || curTag=='all'|| item.tag == curTag).map(item => item.marks))]
    let marksOrder = []
    let sortedMarks = sortByOrderList(newMarks, marksOrder)

    return (
        <>
            <ul className="ua-tabs">
                <li key='all' className={'all' == curTag || !curTag ? 'active' : ''}
                    onClick={() => handleClick('/listPage?tag=all')}
                >
                    全部
                </li>
                {
                    sortedTags.map((tag) => (
                        <li key={tag} className={tag == curTag ? 'active' : ''}
                            onClick={() => handleClick('/listPage?tag=' + tag)}
                        >
                            {tag}
                        </li>
                    ))


                }
            </ul>
            <ul className="ua-tabs">
                <li key='all' className={'all' == curMark || !curMark ? 'active' : ''}
                    onClick={() => handleClick('/listPage?tag='+curTag+"&mark=")}
                >
                    全部
                </li>
                {
                    sortedMarks.map((mark) => (
                        <li key={mark} className={mark == curMark ? 'active' : ''}
                            onClick={() => handleClick('/listPage?tag=' + curTag+"&mark="+mark)}
                        >
                            {mark}
                        </li>
                    ))


                }
            </ul>

        </>

    )
}

TabBar.propTypes = {
    curTag: PropTypes.any.isRequired, // 这里可以根据实际需要调整验证规则
};

export default TabBar