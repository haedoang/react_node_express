# Contributing to CatRoad

Thank you for your interest in contributing to CatRoad!

## Getting Started

1. Fork this repository
2. Clone your fork
3. Create a feature branch (`git checkout -b feature/my-feature`)
4. Make your changes
5. Run tests (`cd Packages/CatRoadKit && swift test`)
6. Commit your changes (`git commit -m "Add my feature"`)
7. Push to the branch (`git push origin feature/my-feature`)
8. Open a Pull Request

## Development Setup

### Requirements

- macOS 14.0+
- Xcode 15.0+
- Swift 5.9+

### Build & Test

```bash
# Build the game engine package
cd Packages/CatRoadKit
swift build

# Run unit tests (no simulator needed)
swift test

# Open in Xcode for full app build
open CatRoad.xcodeproj
```

## Project Structure

- `CatRoad Watch App/` - SwiftUI views (UI only)
- `Packages/CatRoadKit/` - Game engine logic (SPM package)

All game logic lives in CatRoadKit. The Watch App target is a thin UI layer.

## Guidelines

- Keep game logic in `CatRoadKit`, UI in `CatRoad Watch App/`
- Ensure `swift test` passes before submitting a PR
- Follow existing code style and naming conventions
- Write tests for new game logic

## Reporting Issues

Use GitHub Issues to report bugs or request features. Please include:

- Device/simulator model
- watchOS version
- Steps to reproduce (for bugs)
- Screenshots if applicable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
