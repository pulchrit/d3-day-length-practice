## D3 practice

#### Day length visualization

Based on example from Luke Francl: http://www.recursion.org/d3-for-mere-mortals/, but refactored to utilize D3 v5 and React Hooks. However, d3 is doing math AND element rendering...may perhaps be better to have React handle element rendering and leave the math to d3 (especially if we want to handle mouse events for things like tooltips).