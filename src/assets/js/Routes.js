import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Transfers from './Transfers';
import League from './Filters/League';
import Team from './Filters/Team';
import Counter from './Layout/Counter';

//

const Routes = props => {

    return (

        <div className="transfers">

            <Switch>

                <Route exact path="/">

                    {
                        props.transfers.length > 0 
                            ? <div> <Counter length={props.transfers.length} /> <Transfers {...props} /> </div>
                            : <div className="noResults"><p>No transfers in the last 60 days.</p></div>
                    }

                </Route>

                <Route exact path="/:country/:league">

                    <League {...props} />

                </Route>

                <Route exact path="/:country/:league/:team/:direction">

                    <Team {...props} />

                </Route>

            </Switch>

        </div>

    )

}

export default Routes;