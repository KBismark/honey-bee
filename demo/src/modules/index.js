//<@imports>

//import HoneyBee from "../../../lib/index"; // Uncomment this line to enable code completion

//</>

const { UI } = HoneyBee; // HoneyBee is used as `standalone`
const pagelocker = {};
// Lock page creation
UI.lockPageCreation(pagelocker);

const PageInstance = UI.CreateComponent('main', function () {
    this.onCreation = function () {
        this.state = {
            pages: {
                
            }
        }
    }
    return (
        <view>
            <div id="page">
                <p>
                    <a href="/netflix-mobile" style="font-size:22px;font-weight:bold;" onClick={function(e, This){
                        e.preventDefault();
                        /* Load page dynamically */
                        I4W.loadPage('./netflix-mobile-navigation/exporter', {
                            onload() {
                                const netflixMobileNavigation = I4W.import.from('./netflix-mobile-navigation/exporter');
                                UI.renderNewPage('/netflix-mobile', netflixMobileNavigation);
                            },
                            onerror() {
                                alert("Could not load page: /netflix-mobile")
                            }
                        })
                    }}>GO TO NETFLIX MOBILE NAVIGATION PAGE</a>
                </p>
            </div>
        </view>
    )
}).instance();


export default PageInstance;

// Unlock app creation and create page
UI.unlockPageCreation(pagelocker)
UI.CreatePage(typeof document != 'undefined' ? location.pathname : '', PageInstance);