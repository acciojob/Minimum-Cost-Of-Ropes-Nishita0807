function calculateMinCost() {
    const inputElement = document.getElementById("rope-lengths");
    const resultElement = document.getElementById("result");

    // Get input and split it into an array of rope lengths
    const input = inputElement.value;
    const ropeLengths = input.split(',').map(Number);

    // Ensure there are at least two ropes
    if (ropeLengths.length < 2) {
        resultElement.textContent = "Please enter at least two rope lengths.";
        return;
    }

    // Function to find the minimum cost of connecting ropes
    function findMinimumCost(ropeLengths) {
        let totalCost = 0;

        // Create a min-heap to efficiently find the smallest ropes
        const minHeap = new MinHeap();

        // Add all rope lengths to the min-heap
        for (let i = 0; i < ropeLengths.length; i++) {
            minHeap.insert(ropeLengths[i]);
        }

        // Combine ropes until there is only one left in the heap
        while (minHeap.size() > 1) {
            const firstRope = minHeap.extractMin();
            const secondRope = minHeap.extractMin();

            const combinedCost = firstRope + secondRope;
            totalCost += combinedCost;

            minHeap.insert(combinedCost);
        }

        return totalCost;
    }

    // Min-Heap implementation
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(value) {
            this.heap.push(value);
            this.bubbleUp(this.heap.length - 1);
        }

        extractMin() {
            if (this.isEmpty()) {
                return null;
            }

            const minValue = this.heap[0];
            const lastValue = this.heap.pop();

            if (!this.isEmpty()) {
                this.heap[0] = lastValue;
                this.heapify(0);
            }

            return minValue;
        }

        size() {
            return this.heap.length;
        }

        isEmpty() {
            return this.heap.length === 0;
        }

        bubbleUp(index) {
            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);

                if (this.heap[index] < this.heap[parentIndex]) {
                    this.swap(index, parentIndex);
                    index = parentIndex;
                } else {
                    break;
                }
            }
        }

        heapify(index) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightChildIndex;
            }

            if (smallestIndex !== index) {
                this.swap(index, smallestIndex);
                this.heapify(smallestIndex);
            }
        }

        swap(a, b) {
            [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
        }
    }

    // Calculate the minimum cost and display it
    const minimumCost = findMinimumCost(ropeLengths);
    resultElement.textContent = `Minimum Cost of Ropes: ${minimumCost}`;
}

