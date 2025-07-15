# TASK-004 Manual Testing

**Task:** Manually test active learning system  
**Assigned to:** @QA-Engineer  
**Status:** COMPLETED  
**Priority:** critical_path  
**Dependencies:** [TASK-003]

## Manual Test Cases

### Error Forgiveness Testing
1. **First Error Test**
   - Create an error of type "missing-validation"
   - Verify NO penalty applied
   - Verify Learning entity created
   - Check memory contains "Learning-missing-validation-[date]"

2. **Second Error Test**
   - Create same error type "missing-validation"
   - Verify DOUBLE penalty applied
   - Verify learning ignored logged
   - Check penalty calculation correct

### Learning Bonus Testing
1. **Valid Learning Reference Test**
   - Create action with "based on previous learning"
   - Verify +0.5P/Q bonus applied
   - Check bonus logged correctly
   - Verify scores updated

2. **Pattern Detection Test**
   - Test all learning patterns:
     - "based on previous learning"
     - "applying lesson from"
     - "to prevent repeat of"
     - "learned from previous"
   - Verify each triggers bonus

### Integration Testing
1. **Memory Integration Test**
   - Verify learning entities stored in memory
   - Check learning retrieval works
   - Test cross-role learning access

2. **Scoring Integration Test**
   - Verify penalties applied correctly
   - Check bonuses calculated properly
   - Test score file updates

## Success Criteria

- First errors forgiven with learning capture
- Second errors penalized appropriately
- Learning bonuses applied correctly
- Memory integration functional
- Scoring system updated properly