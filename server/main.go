package main

import (
	"embed"
	"mime"
	"net/http"
)

//go:embed web
var content embed.FS

func main() {
	_ = mime.AddExtensionType(".js", "text/javascript")
	_ = mime.AddExtensionType(".css", "text/css")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		p, err := content.ReadFile("web/index.html")
		if err != nil {
			panic(err)
		}
		w.Write(p)
	})

	fs := http.FileServer(http.FS(content))
	http.Handle("/assets/", http.StripPrefix("web/assets", fs))

	if err := http.ListenAndServe(":2016", nil); err != nil {
		panic(err)
	}
}
