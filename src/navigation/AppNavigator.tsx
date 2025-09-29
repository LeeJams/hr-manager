import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList, AuthStackParamList, MainTabParamList, HomeStackParamList, MyPageStackParamList } from '../types';
import { COLORS, NAVIGATION } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MyPageScreen from '../screens/MyPageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CareerScreen from '../screens/CareerScreen';
import ScheduleRegisterScreen from '../screens/ScheduleRegisterScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import TeamManagementScreen from '../screens/TeamManagementScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const MyPageStack = createStackNavigator<MyPageStackParamList>();
const Drawer = createDrawerNavigator();

// Auth Stack Navigator
const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Intro" component={IntroScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
);

// Home Stack Navigator with Drawer
const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.background,
      },
      headerTintColor: COLORS.text,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: COLORS.text,
      },
    }}
  >
    <HomeStack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: '홈',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color={COLORS.text}
            style={{ marginLeft: 16 }}
            onPress={() => (navigation as any).openDrawer()}
          />
        ),
      })}
    />
    <HomeStack.Screen
      name="ProjectDetail"
      component={ProjectDetailScreen}
      options={{ title: '프로젝트 상세' }}
    />
    <HomeStack.Screen
      name="TeamManagement"
      component={TeamManagementScreen}
      options={{ title: '팀 관리' }}
    />
  </HomeStack.Navigator>
);

// Home with Drawer Navigator
const HomeWithDrawer = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: COLORS.background,
        width: 280,
      },
      drawerActiveTintColor: COLORS.primary,
      drawerInactiveTintColor: COLORS.textSecondary,
    }}
  >
    <Drawer.Screen
      name="HomeStack"
      component={HomeStackNavigator}
      options={{
        drawerLabel: '홈',
        drawerIcon: ({ color }) => <Icon name="home-outline" size={20} color={color} />,
      }}
    />
  </Drawer.Navigator>
);

// MyPage Stack Navigator
const MyPageStackNavigator = () => (
  <MyPageStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.background,
      },
      headerTintColor: COLORS.text,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: COLORS.text,
      },
    }}
  >
    <MyPageStack.Screen
      name="MyPageScreen"
      component={MyPageScreen}
      options={{ title: '마이페이지' }}
    />
    <MyPageStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: '내 정보' }}
    />
    <MyPageStack.Screen
      name="Career"
      component={CareerScreen}
      options={{ title: '내 경력' }}
    />
    <MyPageStack.Screen
      name="ScheduleRegister"
      component={ScheduleRegisterScreen}
      options={{ title: '일정 등록' }}
    />
  </MyPageStack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string;

        switch (route.name) {
          case NAVIGATION.TABS.HOME:
            iconName = focused ? 'home' : 'home-outline';
            break;
          case NAVIGATION.TABS.SCHEDULE:
            iconName = focused ? 'calendar' : 'calendar-outline';
            break;
          case NAVIGATION.TABS.MY_PAGE:
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'help-outline';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingTop: 8,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      headerShown: false,
    })}
  >
    <MainTab.Screen
      name={NAVIGATION.TABS.HOME}
      component={HomeWithDrawer}
      options={{ tabBarLabel: '홈' }}
    />
    <MainTab.Screen
      name={NAVIGATION.TABS.SCHEDULE}
      component={ScheduleScreen}
      options={{ tabBarLabel: '일정관리' }}
    />
    <MainTab.Screen
      name={NAVIGATION.TABS.MY_PAGE}
      component={MyPageStackNavigator}
      options={{ tabBarLabel: '마이페이지' }}
    />
  </MainTab.Navigator>
);

// Root App Navigator
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You might want to show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;