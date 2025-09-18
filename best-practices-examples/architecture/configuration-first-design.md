# Configuration-First Design

**Type:** architecture
**Applies To:** medium, large, mega
**Keywords:** configuration, design, architecture, flexibility, maintainability

## Description

Design approach that prioritizes external configuration over hardcoded values to enable flexible, maintainable systems.

## Implementation

### External Configuration
- All environment-specific values externalized
- Configuration hierarchy: runtime → file → defaults
- Validation of configuration at startup
- Hot-reload capabilities where appropriate

### Configuration Structure
- Hierarchical configuration organization
- Environment-specific overrides
- Secure handling of sensitive values
- Configuration documentation and schemas

### Design Principles
- Favor composition over inheritance
- Dependency injection for configurability
- Interface-based design for swappable components
- Configuration-driven behavior selection

## Quality Gates
- [ ] No hardcoded environment-specific values
- [ ] Configuration validation implemented
- [ ] Configuration hierarchy documented
- [ ] Sensitive values properly secured
- [ ] Configuration schema defined
- [ ] Hot-reload tested where applicable

## Examples

### Configuration Hierarchy
```yaml
# config/defaults.yaml
database:
  connection_timeout: 30
  pool_size: 10

# config/production.yaml
database:
  host: prod-db.example.com
  pool_size: 50

# config/development.yaml
database:
  host: localhost
  pool_size: 5
```

### Environment Variable Override
```javascript
const config = {
  database: {
    host: process.env.DB_HOST || config.database.host,
    port: process.env.DB_PORT || config.database.port
  }
};
```