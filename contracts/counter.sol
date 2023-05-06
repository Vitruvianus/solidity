pragma solidity ^0.8.0;

contract MathOperations {
    
    struct MathResults {
        uint256 addition;
        uint256 subtraction;
        uint256 multiplication;
        uint256 division;
    }

    MathResults public mathResults;

    function performMathOperations(uint256[] memory numbers) public {
        if (numbers.length == 0) {
            revert("Array is empty.");
        }
        uint256 sum = 0;
        uint256 difference = numbers[0];
        uint256 product = 1;
        uint256 quotient = numbers[0];
        for (uint i = 0; i < numbers.length; i++) {
            sum += numbers[i];
            if (i > 0) {
                difference -= numbers[i];
                require(numbers[i] != 0, "Division by zero is not allowed.");
                quotient /= numbers[i];
            }
            product *= numbers[i];
        }
        mathResults = MathResults(sum, difference, product, quotient);
    }

    function getMathResults() public view returns (uint256, uint256, uint256, uint256) {
        return (mathResults.addition, mathResults.subtraction, mathResults.multiplication, mathResults.division);
    }
}
