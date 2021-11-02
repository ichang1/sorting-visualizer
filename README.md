# SortingVisualizer

The visualizer can be found at [https://ichang1.github.io/sorting-visualizer/](https://ichang1.github.io/sorting-visualizer/)

The available sorting algorithms that are visualized are:

1. MergeSort
2. QuickSort
3. HeapSort
4. ShellSort
5. BitonicSort

The visualization and array size are both adjustable.

# Installation and Start

1. Clone the repository `git clone https://github.com/ichang1/sorting-visualizer.git`
2. Enter the root of the react project `cd sorting-visualizer/sorting-visualizer`
3. Install the project dependencies `npm install`
4. Start the project locally `npm run start`

# The Basic Idea

The sorting algorithms are implemented in `/Sorting`. All the sorting algorithms are implemented in place. As the algorithms sort an array, at every step, it keeps track of elements at index were swapped, compared, etc. This gives the animations in the same order as the array sort and specifies at which step what indices should be animated with css. The animations are kept track in an array and is returned after the actual sort is finished.

When the user clicks a button to sort, the internal array is sorted and the complete animations array is returned and used to animate the bars that the user sees.
The animations are done in a loop with setTimeout.
