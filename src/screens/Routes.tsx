import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Settings';
import UserHome from './user/UserHome';
import Wishlist from './user/Wishlist';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useAuth } from '#/provider/AuthProvider';
import SignIn from './auth/SignIn';
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from '#/utils/colors';
import Orders from './admin/Orders';
import Users from './admin/Users';
import Products from './admin/Products';
import SignUp from './auth/SignUp';
import Cart from './user/Cart';
import Import from './Import';
import { ModalsContainer } from '#/modal/Modal';
import ProductDetail from './admin/ProductDetail';
import MyOrders from './user/MyOrders';

type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Import: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="home" color={color} size={size} />
);

const SettingsIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="settings" color={color} size={size} />
);

const UsersIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="people" color={color} size={size} />
);

const HeartIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="heart" color={color} size={size} />
);

const BagIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="bag" color={color} size={size} />
);

const ProductIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="list" color={color} size={size} />
);

const bottomLabelStyle = {
  fontSize: 12,
  marginTop: 5,
  fontWeight: 'bold' as const,
};

export const AdminTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="orders"
        component={Orders}
        options={{
          tabBarLabel: 'Захиалга',
          tabBarIcon: ({ color, size }) => HomeIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Захиалга',
        }}
      />
      <Tab.Screen
        name="users"
        component={Users}
        options={{
          tabBarLabel: 'Хэрэглэгч',
          tabBarIcon: ({ color, size }) => UsersIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Хэрэглэгчид',
        }}
      />
      <Tab.Screen
        name="products"
        component={Products}
        options={{
          tabBarLabel: 'Бараа',
          tabBarIcon: ({ color, size }) => ProductIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Бараанууд',
        }}
      />
      <Tab.Screen
        name="adminSettings"
        component={Settings}
        options={{
          tabBarLabel: 'Тохиргоо',
          tabBarIcon: ({ color, size }) => SettingsIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Тохиргоо',
        }}
      />
    </Tab.Navigator>
  );
};

export const UserTabs = () => {
  const { cartItems, wishlistItems } = useAuth();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={UserHome}
        options={{
          tabBarLabel: 'Нүүр',
          tabBarIcon: ({ color, size }) => HomeIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Нүүр',
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: 'Хадгалсан',
          tabBarIcon: ({ color, size }) => HeartIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Хадгалсан',
          tabBarBadge:
            wishlistItems?.length > 0 ? wishlistItems?.length : undefined,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Сагс',
          tabBarIcon: ({ color, size }) => BagIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Сагс',
          tabBarBadge: cartItems?.length > 0 ? cartItems?.length : undefined,
        }}
      />
      <Tab.Screen
        name="userSettings"
        component={Settings}
        options={{
          tabBarLabel: 'Тохиргоо',
          tabBarIcon: ({ color, size }) => SettingsIcon({ color, size }),
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: bottomLabelStyle,
          headerTitle: 'Тохиргоо',
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {!isAuthenticated() ? (
            <Stack.Group>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>
          ) : isAdmin() ? (
            <Stack.Group>
              <Stack.Screen name="AdminApp" component={AdminTabs} />
              <Stack.Screen name="Import" component={Import} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="UserApp" component={UserTabs} />
              <Stack.Screen name="MyOrders" component={MyOrders} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <ModalsContainer />
    </>
  );
};

export default Routes;
