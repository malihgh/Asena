import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TodayReport from '../screens/todayReport';
import HistoryTabNavigator from './HistoryTabNavigator';

const AppNavigaor = createStackNavigator(
  {
    TodayReport: {screen: TodayReport},
    History: {screen: HistoryTabNavigator},
  },
  {
    // headerMode: 'float',
  },
);

const TodayReportToHistory = createAppContainer(AppNavigaor);
export default TodayReportToHistory;
