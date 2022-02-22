import './App.css';
import MainLayout from './layout/MainLayout';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CartProvider } from './components/CartContext/CartContext';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import ProductList from './components/ProductsList/ProductsList';

function App() {
	return (
		<CartProvider>
			<Router>
				<Switch>
					<Route exact path='/'>
						<MainLayout>
							<Home />
						</MainLayout>
					</Route>
					<Route exact path='/products'>
						<MainLayout>
							<ProductList />
						</MainLayout>
					</Route>
					<Route exact path='/recipes'>
						<MainLayout>{/* <FinishPurchase /> */}</MainLayout>
					</Route>
					<Route exact path='/supplier'>
						<MainLayout>{/* <NewSale /> */}</MainLayout>
					</Route>
					<Route exact path='/order'>
						<MainLayout>{/* <Cart /> */}</MainLayout>
					</Route>
					<Route exact path='/order/uid=:id'>
						<MainLayout>{/* <ItemDetails /> */}</MainLayout>
					</Route>
					<Route exact path='/stock'>
						<MainLayout>{/* <ItemList /> */}</MainLayout>
					</Route>
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
			</Router>
		</CartProvider>
	);
}

export default App;
