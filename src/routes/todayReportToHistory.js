import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodayReport from '../screens/todayReport';
import HistoryTabNavigator from './HistoryTabNavigator';
import History from '../screens/history';
const AppNavigaor = createStackNavigator(
  {
    TodayReport: {screen: TodayReport},
    History: {screen: History},
  },
  {
    headerMode: 'none',
  },
);

const TodayReportToHistory = createAppContainer(AppNavigaor);
export default TodayReportToHistory;
