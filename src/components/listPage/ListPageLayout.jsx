
import '@/App.css'
import ListItem from './ListItem.jsx'
import TabBar from './TabBar.jsx'
import allList from '@/data/appList.json';
import { useLocation } from 'react-router-dom';

const ListPageLayout = () => {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let tag = query.get('tag');
  let appId = query.get('appId');
  let searchKey = query.get('searchKey');

  allList.sort((a, b) => {
    if (a.weight == b.weight) {
      return b.updateTime - a.updateTime
    } else {
      return a.weight - b.weight
    }
  });

  function checkMatch(searchKey, item) {

    if (item.title.includes(searchKey) || item.desc.includes(searchKey)) {
      return true;
    }
    return false;
  }
  return (
    <>
      <TabBar curTag={tag} />

      <div className="ua-main-content">

        <div className="ua-content-list">


          {
            allList
              .filter(item => {
                if (appId) { //有id就只用id
                  return item.appId == appId;
                }
                if (searchKey) {
                  return checkMatch(searchKey, item);
                }
                if (!tag || tag == 'all') {
                  return true;
                }

                return item && item.tag == tag

              })
              .map((item) => {

                return <ListItem key={item.fileName} itemData={item} />

              }

              )

          }

        </div>

      </div>
    </>

  )
}

export default ListPageLayout

