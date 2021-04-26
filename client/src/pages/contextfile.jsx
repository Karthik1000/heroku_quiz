import React, {useContext} from 'react'
import {UserContext} from '../components/app'

function contextfile() {
    
    return(
        <template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        <div class="title">Search Bar</div>
        <div class="subnavbar">
          <form class="searchbar">
            <div class="searchbar-inner">
              <div class="searchbar-input-wrap">
                <input type="search" placeholder="Search" />
                <i class="searchbar-icon"></i>
                <span class="input-clear-button"></span>
              </div>
              <span class="searchbar-disable-button if-not-aurora">Cancel</span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="searchbar-backdrop"></div>
      <div class="block searchbar-hide-on-search">
        <p>This block will be hidden on search. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </div>
      <div class="list searchbar-found">
        <ul>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Acura</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Audi</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">BMW</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Cadillac</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Chevrolet</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Chrysler</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Dodge</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Ferrari</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Ford</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">GMC</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Honda</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Hummer</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Hyundai</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Infiniti</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Isuzu</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Jaguar</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Jeep</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Kia</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Lamborghini</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Land Rover</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Lexus</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Lincoln</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Lotus</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Mazda</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Mercedes-Benz</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Mercury</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Mitsubishi</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Nissan</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Oldsmobile</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Peugeot</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Pontiac</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Porsche</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Regal</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Saab</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Saturn</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Subaru</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Suzuki</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Toyota</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Volkswagen</div>
            </div>
          </li>
          <li class="item-content">
            <div class="item-inner">
              <div class="item-title">Volvo</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="block searchbar-not-found">
        <div class="block-inner">Nothing found</div>
      </div>
    </div>
  </div>
</template>
    )
    
    // const user = useContext(UserContext);
    // return(
    //     <div>
    //         User context value is --- {user}
    //     </div>
    // )
    // return (
    //     <div>
    //         <UserContext.Consumer>
    //             {
    //                 user => {
    //                     return (
    //                         <div>
    //                             User context value {user}
    //                         </div>
    //                     )
    //                 }
    //             }
    //         </UserContext.Consumer>
            
    //     </div>
    // )
}


export default contextfile
