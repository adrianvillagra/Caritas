import './App.css';
import MainLayout from './layout/MainLayout';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { CartProvider } from './components/CartContext/CartContext';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import ProductList from './components/ProductsList/ProductsList';
import Product from './components/Product/Product';
import RecipesList from './components/RecipesList/RecipesList';
import Recipe from './components/Recipe/Recipe';
import CalendarRecipes from './components/CalendarRecipes/CalendarRecipes';
import BatchList from './components/BatchList/BatchList';
import CommerceList from './components/CommerceList/CommerceList';
import Commerce from './components/Commerce/Commerce';

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
					<Route exact path='/product/'>
						<MainLayout>
							<Product />
						</MainLayout>
					</Route>
					<Route exact path='/recipes/'>
						<MainLayout>
							<RecipesList />
						</MainLayout>
					</Route>
					<Route exact path='/recipe/'>
						<MainLayout>
							<Recipe />
						</MainLayout>
					</Route>
					<Route exact path='/recipe/:id'>
						<MainLayout>
							<Recipe />
						</MainLayout>
					</Route>
					<Route exact path='/calendar'>
						<MainLayout>
							<CalendarRecipes />
						</MainLayout>
					</Route>
					<Route exact path='/batch'>
						<MainLayout>
							<BatchList />
						</MainLayout>
					</Route>
					<Route exact path='/commerces'>
						<MainLayout>
							<CommerceList />
						</MainLayout>
					</Route>
					<Route exact path='/commerce/'>
						<MainLayout>
							<Commerce />
						</MainLayout>
					</Route>
					<Route exact path='/commerce/:id'>
						<MainLayout>
							<Commerce />
						</MainLayout>
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
