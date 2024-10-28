import '@/App.css'
import ListItem from './ListItem.jsx'
import TabBar from './TabBar.jsx'
import allList from '@/data/appList.json';
import { useLocation } from 'react-router-dom';

const ListPageLayout = () => {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let tag = query.get('tag');
  let mark = query.get('mark')?query.get('mark'):"";

  let appId = query.get('appId');
  let searchKey = query.get('searchKey');

  allList.sort((a, b) => {
    if (a.weight == b.weight) {
      return b.updateTime - a.updateTime
    } else {
      return b.weight - a.weight
    }
  });

  function checkMatch(searchKey, item) {
    if (item.title.includes(searchKey) || item.desc.includes(searchKey)|| item.tag.includes(searchKey)|| item.marks.includes(searchKey)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <TabBar curTag={tag} curMark={mark} />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto divide-y divide-gray-200">
          {
            allList
              .filter(item => {
                if (appId) {
                  return item.appId == appId;
                }
                if (searchKey) {
                  return checkMatch(searchKey, item);
                }
                return item 
                  && (!tag || tag == 'all' ||item.tag == tag )
                  && (!mark || mark == 'all' ||item.marks == mark)
              })
              .map((item) => (
                <ListItem key={item.appId} itemData={item} />
              ))
          }
        </div>
      </main>
    </>
  )
}

export default ListPageLayout
