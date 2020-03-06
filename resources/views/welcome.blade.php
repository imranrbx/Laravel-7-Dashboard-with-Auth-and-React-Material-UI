<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}" />
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div id="app" class="content">
              <Login />
            </div>
        </div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
