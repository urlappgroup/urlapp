import '@/App.css'
import ListItem from './ListItem.jsx'
import TabBar from './TabBar.jsx'
import allList from '@/data/appList.json';
import { useLocation } from 'react-router-dom';

const AppDetailPageLayout = () => {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let tag = query.get('tag')?query.get('tag'):"";
  let appId = query.get('appId');

  // Find the specific item based on appId
  let item = allList.find(item => item.appId == appId);
  //
  const getAppDpcHtmlPath = (item) => {
    return '/apps/' + item.appId + '/' + item.appDocName;
  };
  let docUrl = getAppDpcHtmlPath(item)

  return (
    <>
      <TabBar curTag={tag} />
      <div className="ua-main-content">
        <div className="ua-content-detail">
          {
            item ? (
              <>
                <ListItem key={item.fileName} itemData={item} showType="detail"/>
                {item.appDocName && (
                  <iframe
                    sandbox
                    className="item-doc"
                    src={docUrl}
                    title={item.title}
                    style={{ width: '100%', height: 'calc(100vh - 200px)', border: 'none' }}
                  />
                )}
              </>
            ) : (
              <div className="no-app-found">
                <p>App 未找到</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default AppDetailPageLayout;
