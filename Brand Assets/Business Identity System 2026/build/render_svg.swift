import AppKit
import CoreText
import Foundation

guard CommandLine.arguments.count == 4 else {
    fputs("usage: render_svg input.svg output.png width\n", stderr)
    exit(2)
}

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let width = CGFloat(Double(CommandLine.arguments[3]) ?? 1400)

for file in ["CormorantGaramond-Medium.ttf", "CormorantGaramond-SemiBold.ttf"] {
    let url = URL(fileURLWithPath: NSHomeDirectory()).appendingPathComponent("Library/Fonts/\(file)") as CFURL
    CTFontManagerRegisterFontsForURL(url, .process, nil)
}

guard let image = NSImage(contentsOf: input) else {
    fputs("cannot read SVG\n", stderr)
    exit(3)
}

let ratio = image.size.height / image.size.width
let height = width * ratio
let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: Int(width), pixelsHigh: Int(height), bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
rep.size = NSSize(width: width, height: height)
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: rep)
NSColor.clear.setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()
image.draw(in: NSRect(x: 0, y: 0, width: width, height: height), from: .zero, operation: .sourceOver, fraction: 1)
NSGraphicsContext.restoreGraphicsState()
try rep.representation(using: .png, properties: [:])!.write(to: output)
