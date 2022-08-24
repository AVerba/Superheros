import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderView } from '../views/HeaderView';
import { ListView } from '../views/ListView';

export const App = () => {
  return (
    <>
      <HeaderView />
      <ListView />
    </>
  );
};
