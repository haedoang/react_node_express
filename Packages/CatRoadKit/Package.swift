// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CatRoadKit",
    platforms: [
        .watchOS(.v9),
        .macOS(.v13)
    ],
    products: [
        .library(
            name: "CatRoadKit",
            targets: ["CatRoadKit"]
        ),
    ],
    targets: [
        .target(
            name: "CatRoadKit",
            dependencies: [],
            path: "Sources/CatRoadKit"
        ),
        .testTarget(
            name: "CatRoadKitTests",
            dependencies: ["CatRoadKit"],
            path: "Tests/CatRoadKitTests"
        ),
    ]
)
