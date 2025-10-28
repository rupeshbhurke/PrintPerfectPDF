# PrintPerfect PDF

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://github.com/yourusername/PrintPerfectPDF)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-orange.svg)](https://chrome.google.com/webstore)

> Convert any webpage into a clean, readable, and selectable PDF with professional styling options.

## 🚀 Features

- **📄 One-Click PDF Export**: Convert any webpage to PDF instantly
- **🎨 Multiple Style Presets**: Choose from Clean Reading, Professional Document, or Magazine Style layouts
- **🔧 Smart Content Processing**: Automatically optimizes content for print format
- **⚡ Fast & Lightweight**: Minimal impact on browser performance
- **🌐 Universal Compatibility**: Works on all websites

## 🛠️ Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore) (link coming soon)
2. Click "Add to Chrome"
3. Confirm installation

### Manual Installation (Development)
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/PrintPerfectPDF.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the project folder
5. The extension icon will appear in your toolbar

## 📖 Usage

1. **Navigate** to any webpage you want to convert to PDF
2. **Click** the PrintPerfect PDF extension icon in your toolbar
3. **Select** your preferred style:
   - **Clean Reading**: Optimized for articles and blog posts
   - **Professional Document**: Formal business document layout
   - **Magazine Style**: Rich media and visual content layout
4. **Click** "Export PDF" to generate and download your PDF

## 🎨 Style Options

### Clean Reading
- Simplified layout focused on text readability
- Removes distracting elements
- Optimized for articles and documentation

### Professional Document
- Business-friendly formatting
- Consistent typography and spacing
- Perfect for reports and formal documents

### Magazine Style
- Preserves visual elements and images
- Rich formatting with enhanced layouts
- Ideal for content-heavy pages

## 🏗️ Project Structure

```
PrintPerfectPDF/
├── manifest.json          # Extension configuration
├── background.js           # Service worker for extension logic
├── assets/                 # Icons and resources
│   ├── icon-16.png
│   ├── icon-48.png
│   ├── icon-128.png
│   └── *.pdn              # Source design files
├── popup/                  # Extension popup interface
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/                # Content script for webpage interaction
│   └── content.js
└── pdf/                    # PDF styling and rendering
    ├── renderer.js
    └── styles/
        ├── clean.css
        ├── professional.css
        └── magazine.css
```

## 🔧 Development

### Prerequisites
- Google Chrome browser
- Basic knowledge of JavaScript, HTML, and CSS
- Chrome Extensions development familiarity

### Setup
1. Clone the repository
2. Make your changes to the codebase
3. Load the extension in Chrome developer mode
4. Test your changes on various websites

### Building
This extension uses Manifest V3 and doesn't require a build process. Simply load the unpacked extension in Chrome.

### Testing
1. Load the extension in developer mode
2. Navigate to different types of websites
3. Test each style preset
4. Verify PDF output quality and formatting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Some websites with complex layouts may require manual adjustment
- Dynamic content loaded after page load might not be captured
- Very large pages may take longer to process

## 🔮 Roadmap

- [ ] Custom CSS injection
- [ ] Page range selection
- [ ] Header/footer customization
- [ ] Multiple export formats (PNG, JPEG)
- [ ] Batch processing
- [ ] Cloud storage integration

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/PrintPerfectPDF/issues) page
2. Create a new issue with detailed information
3. Include browser version and website URL if applicable

## 🙏 Acknowledgments

- Chrome Extensions API documentation
- Open source community for inspiration and best practices
- Beta testers and contributors

---

**Made with ❤️ for better web-to-PDF conversion**