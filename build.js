/**
 * Here's a little Nodejs script that renders JSON content, an EJS template, and a CSS file into a PDF.
 * In this case, used to generate my resume.
 *
 * Requires EJS (`npm install ejs`) and Prince (http://princexml.com).
 *
 * @author Spike Brehm <ocelot@gmail.com>
 * @version 19 February 2011
 */

var fs = require('fs'),
    ejs = require('ejs'),
    spawn = require('child_process').spawn;

// Read the EJS template, JSON content, and CSS file into strings.
var layout = fs.readFileSync('./resources/layout.ejs', 'utf8'),
    content = fs.readFileSync('./resources/content.json', 'utf8'),
    style = fs.readFileSync('./resources/style.css', 'utf8');

// Add CSS styles to content object, because we want to embed it in the HTML.
content = JSON.parse(content);
content.style = style;

// Render the template into HTML.
var html = ejs.render(layout, {locals: content});

// Spawn a child process to render the PDF using Prince.
var prince = spawn('prince', ['--input=html', '-', '-o resume.pdf']);
prince.stdin.write(html);
prince.stdin.end();