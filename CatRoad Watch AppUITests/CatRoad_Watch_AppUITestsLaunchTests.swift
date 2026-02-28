//
//  CatRoad_Watch_AppUITestsLaunchTests.swift
//  CatRoad Watch AppUITests
//
//  Created by HAEDONG KIM on 11/24/25.
//

import XCTest

final class CatRoad_Watch_AppUITestsLaunchTests: XCTestCase {

    override class var runsForEachTargetApplicationUIConfiguration: Bool {
        true
    }

    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    @MainActor
    func testLaunch() throws {
        let app = XCUIApplication()
        app.launch()

        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = "Launch Screen"
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
