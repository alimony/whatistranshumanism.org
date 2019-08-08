"use strict";

// #################################################################################################
const
	autoprefixer = require("gulp-autoprefixer"),
	beautify = require("gulp-jsbeautifier"),
	cleanCSS = require("gulp-clean-css"),
	cssDeclarationSorter = require("css-declaration-sorter"),
	cssimport = require("gulp-cssimport"),
	csso = require("gulp-csso"),
	gulp = require("gulp"),
	gulpPostcss = require("gulp-postcss"),
	htmlmin = require("gulp-htmlmin"),
	imagemin = require("gulp-imagemin"),
	inlinesource = require("gulp-inline-source"),
	minifyInline = require("gulp-minify-inline"),
	minifyInlineJSON = require("gulp-minify-inline-json"),
	realFavicon = require("gulp-real-favicon"),
	shell = require("gulp-shell"),
	sriHash = require("gulp-sri-hash"),
	svgo = require("gulp-svgo"),
	uglify = require("gulp-uglify-es").default;

// #################################################################################################
const
	cssInput = "./dist/**/*.css",
	cssOutput = "./dist",

	jsInput = "./assets/**/*.js",
	jsOutput = "./dist",

	htmlInput = ["./dist/**/*.{html,xml}", "!./dist/**/*browserconfig.xml"],
	htmlOutput = "./dist",
	htmlminOptions = {
		collapseBooleanAttributes: true,
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		conservativeCollapse: false,
		decodeEntities: true,
		html5: true,
		keepClosingSlash: false,
		minifyCSS: true,
		minifyJS: true,
		minifyURLs: true,
		preserveLineBreaks: false,
		preventAttributesEscaping: false,
		processConditionalComments: false,
		quoteCharacter: "\"",
		removeAttributeQuotes: false,
		removeComments: true,
		removeEmptyAttributes: true,
		removeEmptyElements: false,
		removeOptionalTags: false,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		sortAttributes: false,
		sortClassName: true,
		useShortDoctype: false
	},

	imgInput = "./dist/**/*",
	imgOutput = "./dist",

	faviconDataFile = "tmp/faviconData.json";

// #################################################################################################
gulp.task("hugo", shell.task(
	"hugo"
));

gulp.task("css", function () {
	return gulp
		.src(cssInput)
		.pipe(cssimport())
		.pipe(autoprefixer())
		.pipe(gulpPostcss([cssDeclarationSorter({
			order: "alphabetically"
		})]))
		.pipe(csso({
			comments: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		// .pipe(beautify({
		// 	config: "./.jsbeautify.json"
		// }))
		.pipe(gulp.dest(cssOutput));
});

gulp.task("js", function () {
	return gulp
		.src(jsInput)
		.pipe(uglify())
		// .pipe(beautify({
		// 	config: "./.jsbeautify.json"
		// }))
		.pipe(gulp.dest(jsOutput));
});

gulp.task("html", function () {
	return gulp
		.src(htmlInput)
		.pipe(inlinesource())
		.pipe(sriHash({
			algo: "sha512",
			relative: true
		}))
		.pipe(htmlmin(htmlminOptions))
		.pipe(minifyInline())
		.pipe(minifyInlineJSON())
		// .pipe(beautify({
		// 	config: "./.jsbeautify.json"
		// }))
		.pipe(gulp.dest(htmlOutput));
});

gulp.task("img", function () {
	return gulp
		.src(imgInput)
		.pipe(svgo())
		.pipe(imagemin())
		.pipe(gulp.dest(imgOutput));
});

// #################################################################################################
gulp.task("fav-generate", function (done) {
	realFavicon.generateFavicon({
		design: {
			androidChrome: {
				assets: {
					legacyIcon: true,
					lowResolutionIcons: true,
				},
				manifest: {
					declared: true,
					display: "standalone",
					name: "Example",
					onConflict: "override",
					orientation: "notSet",
					startUrl: "https://transhumanism.netlify.com",
				},
				pictureAspect: "noChange",
				themeColor: "#000000"
			},
			desktopBrowser: {},
			ios: {
				appName: "Example",
				assets: {
					declareOnlyDefaultIcon: false,
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: true
				},
				backgroundColor: "#000000",
				margin: "0%",
				pictureAspect: "backgroundAndMargin",
			},
			pictureAspect: "noChange",
			safariPinnedTab: {
				pictureAspect: "silhouette",
				themeColor: "#000000"
			},
			themeColor: "#000000",
			windows: {
				appName: "Example",
				assets: {
					windows10Ie11EdgeTiles: {
						big: true,
						medium: true,
						rectangle: true,
						small: true
					},
					windows80Ie10Tile: true
				},
				backgroundColor: "#000000",
				onConflict: "override",
				pictureAspect: "noChange",
			},
		},
		dest: "./tmp/fav",
		iconsPath: "/",
		markupFile: faviconDataFile,
		masterPicture: "./static/_0.png",
		settings: {
			compression: 5,
			errorOnImageTooSmall: false,
			htmlCodeFile: false,
			readmeFile: false,
			scalingAlgorithm: "Mitchell",
			usePathAsIs: false,
		},
	}, function () {
		done();
	});
});

gulp.task("fav-move", function () {
	return gulp
		.src("./tmp/fav/**/*")
		.pipe(gulp.dest("./static", {
			overwrite: false
		}));
});

gulp.task("fav", gulp.series(
	"fav-generate",
	"fav-move"
));

// #################################################################################################
gulp.task("default", gulp.series(
	"hugo",
	"css",
	"js",
	"html",
	"img",
));