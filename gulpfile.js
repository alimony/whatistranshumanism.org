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
		conservativeCollapse: true,
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
	imgOutput = "./dist";

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

gulp.task("default", gulp.series(
	"hugo",
	"css",
	"js",
	"html",
	"img",
));