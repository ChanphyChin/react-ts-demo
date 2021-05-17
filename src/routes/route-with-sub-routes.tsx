import {
    Route,
} from "react-router-dom";

export const RouteWithSubRoutes = (route: any) => {
    return (
      <Route
        path={route.path}
        render={props => (
          // pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.children} />
        )}
      />
    );
}