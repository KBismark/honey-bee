//<@imports>

//import HoneyBee from '../../../../lib/index'; // Uncomment this line to enable code completion
//</>

const { UI } = HoneyBee; // HoneyBee is used as `standalone`
const pagelocker = {};
// Lock app creation before exporting
UI.lockPageCreation(pagelocker);

const PageInstance = UI.CreateComponent('netflix', function () {
    
    this.onCreation = function () {
        this.state = {
            isVisible: false
        }
    }

    return (
        <view>
            <div id="page" class="page">
                <style><>{style}</></style>
                <button class="nav-btn open-btn" onClick={function(e, This){
                  This.state.isVisible = true;
                }}>
                    <i class="fas fa-bars"></i>
                </button>

                <img
                    src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                    alt="Logo" class="logo" />

          <p class="text">Mobile Navigation</p>
          <p>
            <a href="/" style="font-size:22px;font-weight:bold;" onClick={function(e, This){
                        e.preventDefault();
                        /* Load homepage dynamically */
                        I4W.loadPage('../index', {
                            onload() {
                                const Hompage = I4W.import.from('../index');
                                UI.renderNewPage('/', Hompage);
                            },
                            onerror() {
                                alert("Could not load homepage")
                            }
                        })
                    }}>GO BACK TO HOME PAGE</a>
          </p>

                <div class="nav nav-black" $class={{ value: state.isVisible ? 'visible' : '', $dep: ['isVisible'] }}>
                    <div class="nav nav-red" $class={{ value: state.isVisible ? 'visible' : '', $dep: ['isVisible'] }}>
                        <div class="nav nav-white" $class={{ value: state.isVisible ? 'visible' : '', $dep: ['isVisible'] }}>
                            <button class="nav-btn close-btn" onClick={function(e, This){
                                This.state.isVisible = false;
                            }}>
                                <i class="fas fa-times"></i>
                            </button>

                            <img
                                src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456"
                                alt="Logo" class="logo" />

                            <ul class="list">
                                <li><a href="#">Teams</a></li>
                                <li><a href="#">Locations</a></li>
                                <li><a href="#">Life at Netflix</a></li>
                                <li>
                                    <ul>
                                        <li><a href="#">Netflix culture memo</a></li>
                                        <li><a href="#">Work life balance</a></li>
                                        <li><a href="#">Inclusion & diversity</a></li>
                                        <li><a href="#">Blog</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </view>
    )
}).instance();

export default PageInstance;

const style =
    `@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

.page {
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.text {
  text-transform: uppercase;
}

.logo {
  width: 200px;
}

.nav-btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
}

.open-btn {
  position: fixed;
  top: 10px;
  left: 10px;
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.nav.visible {
  transform: translateX(0);
}

.nav-black {
  background-color: rgb(34, 31, 31);
  width: 60%;
  max-width: 480px;
  min-width: 320px;
  transition-delay: 0.4s;
}

.nav-black.visible {
  transition-delay: 0s;
}

.nav-red {
  background-color: rgb(229, 9, 20);
  width: 95%;
  transition-delay: 0.2s;
}

.nav-red.visible {
  transition-delay: 0.2s;
}

.nav-white {
  background-color: #fff;
  width: 95%;
  padding: 40px;
  position: relative;
  transition-delay: 0s;
}

.nav-white.visible {
  transition-delay: 0.4s;
}

.close-btn {
  opacity: 0.3;
  position: absolute;
  top: 40px;
  right: 30px;
}

.list {
  list-style-type: none;
  padding: 0;
}

.list li {
  margin: 20px 0;
}

.list li a {
  color: rgb(34, 31, 31);
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
}

.list ul {
  list-style-type: none;
  padding-left: 20px;
}`;

// Unlock app creation and create page
UI.unlockPageCreation(pagelocker)
UI.CreatePage(typeof document != 'undefined' ? location.pathname : '', PageInstance);