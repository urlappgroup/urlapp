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
    curTag = curTag || "all";
    curMark = curMark || "all";
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
        <div className="">
            <div className="container mx-auto px-4 py-2 space-y-2">
                {/* Tags Section */}
                <div className="flex flex-wrap gap-1">
                    <button
                        key="all"
                        onClick={() => handleClick('/listPage?tag=all')}
                        className={`px-2 py-1 text-sm rounded-lg transition-all duration-300
                            ${('all' === curTag || !curTag)
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                : 'bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 hover:shadow-md'
                            }`}
                    >
                        全部分类
                    </button>
                    {sortedTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleClick('/listPage?tag=' + tag)}
                            className={`px-2 py-1 text-sm rounded-lg transition-all duration-300
                                ${tag === curTag
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                    : 'bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 hover:shadow-md'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Marks Section */}
                <div className="flex flex-wrap gap-1">
                    <button
                        key="all"
                        onClick={() => handleClick('/listPage?tag='+curTag+"&mark=")}
                        className={`px-2 py-1 text-sm rounded-lg transition-all duration-300
                            ${('all' === curMark || !curMark)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        全部标签
                    </button>
                    {sortedMarks.map((mark) => (
                        <button
                            key={mark}
                            onClick={() => handleClick('/listPage?tag=' + curTag+"&mark="+mark)}
                            className={`px-2 py-1 text-sm rounded-lg transition-all duration-300
                                ${mark === curMark
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                        >
                            {mark}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

TabBar.propTypes = {
    curTag: PropTypes.string,
    curMark: PropTypes.string
};

export default TabBar
