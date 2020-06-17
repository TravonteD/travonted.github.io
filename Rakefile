require 'rake/clean'

# TODO tasks:
# - rendering of the home page with links to the articles (using erb)

source_files = FileList['src/*.md']
page_files = FileList['index.html', 'articles.html']
articles = source_files.pathmap('articles/%n.html')
CLOBBER.include(page_files, articles, '*.css', '*.css.map')

directory 'articles'
task default: articles + ['style.css'] + page_files

desc 'Generates the article pages using the template'
file articles => [source_files]

desc 'Builds the stylesheet using sass'
file 'style.css' => 'style.scss' do |t|
  sh "sass #{t.source} #{t.name}"
end

desc 'Renders the page using ERB'
file page_files => articles

rule '.html' => ->{"src/#{_1.pathmap('%n')}.md"} do |t|
  sh "pandoc -so #{t.name} --template=template.html --css=../style.css #{t.source}"
end
 
rule 'index.html' do |t|
  render(t)
end

rule 'articles.html' do |t|
  render(t)
end

def render(task)
  require 'erb'

  @list = FileList['src/*.md']
    .pathmap('articles/%n.html')
    .map { { link: _1, title: `rg '.*<title>(.*)</title>.*' -r '$1' #{_1}`.chomp } }

  File.open(task.name, 'w') { _1.write(ERB.new(File.read("#{task.name}.erb")).result) }
end
