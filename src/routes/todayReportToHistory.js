import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodayReport from '../screens/todayReport';
import History from '../screens/history';

const AppNavigaor = createStackNavigator(
  {
    TodayReport: {screen: TodayReport},
    History: {screen: History},
  },
  {
    // headerMode: 'float',
  },
);

const TodayReportToHistory = createAppContainer(AppNavigaor);
export default TodayReportToHistory;
