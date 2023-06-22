# How to run Demo
Navigate to the `demo` directory and on the terminal run `npm run build` to build the neccssary files. This demo tests against latest pushed to this branch of the Honeybee repo.    

While testing, you can as well modify the code in the `src/modules` directory to see results. Since honeybeeJS has no implemented dev environment with a hot module reload system, you would be required to re-build `npm run build` after modifying the code to see the results in the browser.

## Navigation in HoneyBee
HoneybeeJS uses a file-based routing system for page navigations. This is made possible by the introduction of the [import-for-web](https://github.com/KBismark/import-for-web). Import-For-Web, I4W is a new code modularization and bundling tool built specifically to make multi-page applications behave as single page applications and also to provide an asynchronous mechanism for loading page resources. 

```js
import HoneyBee from 'honey-bee';
const { UI } = HoneyBee;

const onClickHandler = (event, component_object)=>{
    event.preventDefault();
    // Load page dynamically
    I4W.loadPage('./some_pages/somepage',{
        args: undefined, // Can be anything to pass to your callback as argument
        onload:(args)=>{
            const Newpage = I4W.import.from('./some_pages/somepage');
            UI.renderNwePage("/new_page's_pathname", NewPage); // renders a new pqge
        },
        onerror:(args)=>{
            alert("Couldn't load page");
        }
    })
}
export default UI.CreateComponent('unique_identifier',function(){

    return (
        <view>
            <div id="page">
                <a href="to_sompage_if_JS_not_supported" onClick={onClickHandler}>Go to some page</a>
            </div>
        </view>
    )
})


```

## UI methods of HoneyBee 
> ### UI.CreateComponent(name: string, component: function)
> The `CreateComponent` method of the UI class creates a new component. It returns a function that is named as a Component Class in HoneyBeeJS. A component class is the basic way for creating reusable components in your application. It provides a way for creating instances of a defined a view along with its logics. You can think of a component class as a normal JavaScript class encapsulated into a function.
> ```js
> const Button = UI.CreateComponent('my_unique_button',function({title}){
>
>    return (
>        <view>
>            <button> <>{args.title}</> </button>
>        </view>
>   )
> })
>
> export default UI.CreateComponent('main',function(){
>
>    return (
>        <view>
>            <div id="page">
>               <>{ Button({title:'Tittle 1'}) }</>
>               <>{ Button({title:'Tittle 2'}) }</>
>               <>{ Button({title:'Tittle 3'}) }</>
>            </div>
>        </view>
>   )
> })
>
> ```