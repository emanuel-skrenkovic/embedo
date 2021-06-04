PACKAGE_DIR = public
WASM_DIR = public/scripts

build:
	wasm-pack build --target web --out-dir $(WASM_DIR) && \
		cp index.html public/ && \
		cp -r scripts public/ &&  \
		cp -r stylesheets public/ && \
		rm $(WASM_DIR)/.gitignore && \
		rm $(WASM_DIR)/package.json && \
		rm $(WASM_DIR)/README.md

run: build
	python3 -m http.server --directory public
