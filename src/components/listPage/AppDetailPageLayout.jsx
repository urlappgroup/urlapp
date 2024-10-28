import '@/App.css'
import ListItem from './ListItem.jsx'
import TabBar from './TabBar.jsx'
import allList from '@/data/appList.json';
import { useLocation } from 'react-router-dom';

const AppDetailPageLayout = () => {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  let tag = query.get('tag')?query.get('tag'):"";
  let mark = query.get('mark')?query.get('mark'):"";
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
      <TabBar curTag={tag}  curMark={mark} />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {
            item ? (
              <>
                <ListItem key={item.fileName} itemData={item} showType="detail"/>
                {item.appDocName && (
                  <iframe
                    sandbox
                    src={docUrl}
                    title={item.title}
                    className="w-full h-[calc(100vh-200px)] border-none mt-4"
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">App 未找到</p>
              </div>
            )
          }
        </div>
      </main>
    </>
  )
}

export default AppDetailPageLayout;
