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

const TabBar = ({ curTag, curMark }) => {
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
        <div className="px-4 pt-2 pb-1 space-y-1">
            <ul className="flex flex-wrap gap-1">
                <li 
                    key='all' 
                    className={`px-2 py-0.5 text-sm rounded-md cursor-pointer transition-colors
                        ${('all' == curTag || !curTag) 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    onClick={() => handleClick('/listPage?tag=all')}
                >
                    全部
                </li>
                {sortedTags.map((tag) => (
                    <li 
                        key={tag} 
                        className={`px-2 py-0.5 text-sm rounded-md cursor-pointer transition-colors
                            ${tag == curTag 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => handleClick('/listPage?tag=' + tag)}
                    >
                        {tag}
                    </li>
                ))}
            </ul>

            <ul className="flex flex-wrap gap-1">
                <li 
                    key='all' 
                    className={`px-2 py-0.5 text-sm rounded-md cursor-pointer transition-colors
                        ${('all' == curMark || !curMark) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    onClick={() => handleClick('/listPage?tag='+curTag+"&mark=")}
                >
                    全部
                </li>
                {sortedMarks.map((mark) => (
                    <li 
                        key={mark} 
                        className={`px-2 py-0.5 text-sm rounded-md cursor-pointer transition-colors
                            ${mark == curMark 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        onClick={() => handleClick('/listPage?tag=' + curTag+"&mark="+mark)}
                    >
                        {mark}
                    </li>
                ))}
            </ul>
        </div>
    )
}

TabBar.propTypes = {
    curTag: PropTypes.any.isRequired, // 这里可以根据实际需要调整验证规则
};

export default TabBar
