//
//  ContentView.swift
//  CatRoad
//
//  Created by haedoang on 2/28/26.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // App Icon & Title
                VStack(spacing: 12) {
                    Image(systemName: "applewatch")
                        .font(.system(size: 60))
                        .foregroundColor(.orange)
                    Text("CatRoad")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                    Text("companion_subtitle")
                        .foregroundColor(.secondary)
                }
                .padding(.top, 40)

                Divider()

                // How to Play
                VStack(alignment: .leading, spacing: 16) {
                    Text("companion_how_to_play")
                        .font(.title2)
                        .fontWeight(.semibold)

                    GuideRow(icon: "applewatch", step: "1", text: String(localized: "guide_step1"))
                    GuideRow(icon: "hand.tap", step: "2", text: String(localized: "guide_step2"))
                    GuideRow(icon: "digitalcrown.arrow.clockwise", step: "3", text: String(localized: "guide_step3"))
                    GuideRow(icon: "hand.draw", step: "4", text: String(localized: "guide_step4"))
                    GuideRow(icon: "exclamationmark.triangle", step: "5", text: String(localized: "guide_step5"))
                }
                .padding(.horizontal)

                Divider()

                // Tips
                VStack(alignment: .leading, spacing: 12) {
                    Text("companion_tips")
                        .font(.title2)
                        .fontWeight(.semibold)

                    TipRow(icon: "speedometer", text: String(localized: "tip_speed"))
                    TipRow(icon: "bus.fill", text: String(localized: "tip_bus"))
                    TipRow(icon: "trophy", text: String(localized: "tip_highscore"))
                }
                .padding(.horizontal)

                Spacer(minLength: 40)
            }
        }
    }
}

struct GuideRow: View {
    let icon: String
    let step: String
    let text: String

    var body: some View {
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(Color.orange.opacity(0.15))
                    .frame(width: 44, height: 44)
                Image(systemName: icon)
                    .foregroundColor(.orange)
            }
            VStack(alignment: .leading, spacing: 2) {
                Text("Step \(step)")
                    .font(.caption)
                    .foregroundColor(.orange)
                    .fontWeight(.semibold)
                Text(text)
                    .font(.subheadline)
            }
        }
    }
}

struct TipRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.orange)
                .frame(width: 24)
            Text(text)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
}

#Preview {
    ContentView()
}
