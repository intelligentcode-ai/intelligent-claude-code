# Test-Driven Development (TDD)

**Type:** development
**Applies To:** medium, large, mega
**Keywords:** testing, tdd, red-green-refactor, unit tests, quality

## Description

Test-Driven Development approach using the Red-Green-Refactor cycle to drive design and ensure comprehensive test coverage.

## Implementation

### Red-Green-Refactor Cycle
- **Red**: Write a failing test that captures the desired functionality
- **Green**: Write the minimum code to make the test pass
- **Refactor**: Improve code structure while keeping tests passing

### Test Structure
- Use descriptive test names that explain behavior
- Follow Arrange-Act-Assert pattern
- One assertion per test when possible
- Test edge cases and error conditions

### Test Coverage
- Aim for 80%+ code coverage minimum
- Focus on testing behavior, not implementation
- Test public interfaces, not private methods
- Include integration tests for key workflows

## Quality Gates
- [ ] All new code has corresponding tests written first
- [ ] Test coverage maintained above 80%
- [ ] All tests pass before code commit
- [ ] Test names clearly describe expected behavior
- [ ] Edge cases and error conditions tested
- [ ] Integration tests cover key workflows

## Examples

### TDD Cycle Example
```javascript
// RED: Write failing test
test('should calculate total price with tax', () => {
    const cart = new ShoppingCart();
    cart.addItem({price: 100, quantity: 2});
    
    const total = cart.getTotalWithTax(0.08);
    
    expect(total).toBe(216); // 200 + 16 tax
});

// GREEN: Make test pass
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    addItem(item) {
        this.items.push(item);
    }
    
    getTotalWithTax(taxRate) {
        const subtotal = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0);
        return subtotal * (1 + taxRate);
    }
}

// REFACTOR: Improve structure while keeping tests green
```

### Test Organization
```javascript
describe('ShoppingCart', () => {
    describe('getTotalWithTax', () => {
        it('should return 0 for empty cart', () => {
            // Test implementation
        });
        
        it('should calculate tax on single item', () => {
            // Test implementation
        });
        
        it('should handle zero tax rate', () => {
            // Test implementation
        });
    });
});
```