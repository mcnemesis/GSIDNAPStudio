Formbuilder.registerField 'trigger',

  order: 38
  type: 'non_input'

  view: """
    <div class="stub-trigger-field" >
       <img style="height:100px; width:auto;"
       src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIwOS45MiAyMDkuOTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDIwOS45MiAyMDkuOTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8cGF0aCBzdHlsZT0iZmlsbDojNjAyRjc1OyIgZD0iTTEwMC42OTMsMTg1LjE3M2MtNDUuMTcsMC04MS45Mi0zNi43NS04MS45Mi04MS45MnMzNi43NS04MS45Miw4MS45Mi04MS45MnM4MS45MiwzNi43NSw4MS45Miw4MS45MiAgYzAsMS44ODQtMS41MjksMy40MTMtMy40MTMsMy40MTNjLTEuODg0LDAtMy40MTMtMS41MjktMy40MTMtMy40MTNjMC00MS40MDctMzMuNjg2LTc1LjA5My03NS4wOTMtNzUuMDkzUzI1LjYsNjEuODQ2LDI1LjYsMTAzLjI1MyAgczMzLjY4Niw3NS4wOTMsNzUuMDkzLDc1LjA5M2MxLjg4NCwwLDMuNDEzLDEuNTI5LDMuNDEzLDMuNDEzUzEwMi41NzcsMTg1LjE3MywxMDAuNjkzLDE4NS4xNzN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiMwMEU3RkY7IiBkPSJNMTQxLjMwOSw5NS44NThoLTQuMzc5Yy0wLjk1Ny00LjcyMS0yLjgyNS05LjEwNS01LjM5NS0xMi45ODZsMy4xMDgtMy4xMDggIGMxLjQ2OC0xLjQ2OCwxLjQ2OC0zLjg0NywwLTUuMzE1bC01LjE0NC01LjE0NGMtMS40NjgtMS40NjgtMy44NDctMS40NjgtNS4zMTUsMGwtMy4xMDgsMy4xMDggIGMtMy44ODEtMi41Ny04LjI2NS00LjQzNy0xMi45ODYtNS4zOTVWNjIuNjRjMC0yLjA3NS0xLjY4My0zLjc1OC0zLjc1OC0zLjc1OGgtNy4yNzRjLTIuMDc1LDAtMy43NTgsMS42ODMtMy43NTgsMy43NTh2NC4zNzkgIGMtNC43MjEsMC45NTctOS4xMDUsMi44MjUtMTIuOTg2LDUuMzk1bC0zLjEwOC0zLjEwOGMtMS40NjgtMS40NjgtMy44NDctMS40NjgtNS4zMTUsMGwtNS4xNDQsNS4xNDQgIGMtMS40NjgsMS40NjgtMS40NjgsMy44NDcsMCw1LjMxNWwzLjEwOCwzLjEwOGMtMi41NywzLjg4MS00LjQzNyw4LjI2NS01LjM5NSwxMi45ODZoLTQuMzc5Yy0yLjA3NSwwLTMuNzU4LDEuNjgzLTMuNzU4LDMuNzU4ICB2Ny4yNzRjMCwyLjA3NSwxLjY4MywzLjc1OCwzLjc1OCwzLjc1OGg0LjM3OWMwLjk1Nyw0LjcyMSwyLjgyNSw5LjEwNSw1LjM5NSwxMi45ODZsLTMuMTA4LDMuMTA4Yy0xLjQ2OCwxLjQ2OC0xLjQ2OCwzLjg0NywwLDUuMzE1ICBsNS4xNDQsNS4xNDRjMS40NjgsMS40NjgsMy44NDcsMS40NjgsNS4zMTUsMGwzLjEwOC0zLjEwOGMzLjg4MSwyLjU3LDguMjY1LDQuNDM3LDEyLjk4Niw1LjM5NXY0LjM3OSAgYzAsMi4wNzUsMS42ODMsMy43NTgsMy43NTgsMy43NThoNy4yNzRjMi4wNzUsMCwzLjc1OC0xLjY4MywzLjc1OC0zLjc1OHYtNC4zNzljNC43MjEtMC45NTcsOS4xMDUtMi44MjUsMTIuOTg2LTUuMzk1bDMuMTA4LDMuMTA4ICBjMS40NjgsMS40NjgsMy44NDcsMS40NjgsNS4zMTUsMGw1LjE0NC01LjE0NGMxLjQ2OC0xLjQ2OCwxLjQ2OC0zLjg0NywwLTUuMzE1bC0zLjEwOC0zLjEwOGMyLjU3LTMuODgxLDQuNDM3LTguMjY1LDUuMzk1LTEyLjk4NiAgaDQuMzc5YzIuMDc1LDAsMy43NTgtMS42ODMsMy43NTgtMy43NTh2LTcuMjc0QzE0NS4wNjcsOTcuNTQxLDE0My4zODQsOTUuODU4LDE0MS4zMDksOTUuODU4eiBNMTAwLjY5MywxMTYuMTk1ICBjLTcuMTQ4LDAtMTIuOTQyLTUuNzk0LTEyLjk0Mi0xMi45NDJjMC03LjE0OCw1Ljc5NC0xMi45NDIsMTIuOTQyLTEyLjk0MmM3LjE0OCwwLDEyLjk0Miw1Ljc5NCwxMi45NDIsMTIuOTQyICBDMTEzLjYzNSwxMTAuNDAxLDEwNy44NDEsMTE2LjE5NSwxMDAuNjkzLDExNi4xOTV6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM2MDJGNzU7IiBkPSJNMTA0LjMzLDE1MS4wNGgtNy4yNzRjLTMuOTU0LDAtNy4xNzMtMy4yMTctNy4xNzMtNy4xNzF2LTEuNjkxICBjLTMuMTU5LTAuODc2LTYuMTkyLTIuMTM3LTkuMDYyLTMuNzY3bC0xLjIwNSwxLjIwNWMtMi43OTYsMi43OTYtNy4zNDUsMi43OTYtMTAuMTQxLDBsLTUuMTQ0LTUuMTQ0ICBjLTEuMzU1LTEuMzUzLTIuMTAxLTMuMTU2LTIuMTAxLTUuMDdjMC0xLjkxNywwLjc0OC0zLjcxNywyLjEwMy01LjA3MmwxLjIwMy0xLjIwNWMtMS42My0yLjg3MS0yLjg5MS01LjkwMy0zLjc2Ny05LjA2MmgtMS42OTEgIGMtMy45NTQsMC03LjE3MS0zLjIxNy03LjE3MS03LjE3M3YtNy4yNzRjMC0zLjk1NCwzLjIxNy03LjE3MSw3LjE3MS03LjE3MWgxLjY5MWMwLjg3Ni0zLjE1OSwyLjEzNy02LjE5MiwzLjc2Ny05LjA2MmwtMS4yMDUtMS4yMDUgIGMtMS4zNTMtMS4zNTMtMi4xMDEtMy4xNTYtMi4xMDEtNS4wN2MwLTEuOTE1LDAuNzQ4LTMuNzE3LDIuMTAzLTUuMDcybDUuMTQyLTUuMTQyYzEuMzUzLTEuMzU1LDMuMTU2LTIuMTAxLDUuMDctMi4xMDEgIGMxLjkxNSwwLDMuNzE3LDAuNzQ4LDUuMDcyLDIuMTAzbDEuMjA1LDEuMjAzYzIuODcxLTEuNjMsNS45MDMtMi44OTEsOS4wNjItMy43Njd2LTEuNjkxYzAtMy45NTQsMy4yMTctNy4xNzEsNy4xNzMtNy4xNzFoNy4yNzQgIGMzLjk1NCwwLDcuMTczLDMuMjE3LDcuMTczLDcuMTcxdjEuNjkxYzMuMTU5LDAuODc2LDYuMTkyLDIuMTM3LDkuMDYyLDMuNzY3bDEuMjA1LTEuMjA1YzEuMzUzLTEuMzUzLDMuMTU2LTIuMTAxLDUuMDctMi4xMDEgIGMxLjkxNSwwLDMuNzE3LDAuNzQ4LDUuMDcyLDIuMTAzbDUuMTQyLDUuMTQyYzEuMzU1LDEuMzUzLDIuMTAxLDMuMTU2LDIuMTAxLDUuMDdzLTAuNzQ4LDMuNzE3LTIuMTAzLDUuMDcybC0xLjIwMywxLjIwNSAgYzEuNjMsMi44NzEsMi44OTEsNS45MDMsMy43NjcsOS4wNjJoMS42OTFjMy45NTQsMCw3LjE3MSwzLjIxNyw3LjE3MSw3LjE3MXY3LjI3NGMwLDMuOTU0LTMuMjE3LDcuMTczLTcuMTcxLDcuMTczaC0xLjY5MSAgYy0wLjg3NiwzLjE1OS0yLjEzNyw2LjE5Mi0zLjc2Nyw5LjA2MmwxLjIwNSwxLjIwNWMxLjM1MywxLjM1MywyLjEwMSwzLjE1NiwyLjEwMSw1LjA3YzAsMS45MTUtMC43NDgsMy43MTctMi4xMDEsNS4wNyAgbC01LjE0NCw1LjE0NGMtMi43OTYsMi43OTctNy4zNDcsMi43OTctMTAuMTQxLDBsLTEuMjA1LTEuMjA1Yy0yLjg3MSwxLjYzLTUuOTAzLDIuODkxLTkuMDYyLDMuNzY3djEuNjkxICBDMTExLjUwMiwxNDcuODIzLDEwOC4yODUsMTUxLjA0LDEwNC4zMywxNTEuMDR6IE04MC4zMTIsMTMwLjY4MWMwLjY1MiwwLDEuMzA3LDAuMTg2LDEuODg0LDAuNTY4ICBjMy42MiwyLjM5NCw3LjU4Myw0LjA0MywxMS43ODEsNC44OTVjMS41OTEsMC4zMjMsMi43MzQsMS43MjIsMi43MzQsMy4zNDV2NC4zNzljMCwwLjE4OSwwLjE1NSwwLjM0NSwwLjM0NiwwLjM0NWg3LjI3NCAgYzAuMTkxLDAsMC4zNDYtMC4xNTUsMC4zNDYtMC4zNDV2LTQuMzc5YzAtMS42MjMsMS4xNDMtMy4wMjMsMi43MzQtMy4zNDVjNC4xOTgtMC44NTMsOC4xNjEtMi41LDExLjc4MS00Ljg5NSAgYzEuMzUzLTAuODk2LDMuMTQ5LTAuNzE1LDQuMjk3LDAuNDMybDMuMTA4LDMuMTA4YzAuMTM1LDAuMTM1LDAuMzUzLDAuMTM1LDAuNDg4LDBsNS4xNDQtNS4xNDRjMC4xMTQtMC4xMTQsMC4xMTQtMC4zNzIsMC0wLjQ4OCAgbC0zLjExLTMuMTFjLTEuMTQ3LTEuMTQ3LTEuMzI4LTIuOTQ0LTAuNDMyLTQuMjk3YzIuMzk0LTMuNjIsNC4wNDMtNy41ODMsNC44OTUtMTEuNzgxYzAuMzIzLTEuNTkxLDEuNzIyLTIuNzM0LDMuMzQ1LTIuNzM0aDQuMzc5ICBjMC4xODksMCwwLjM0NS0wLjE1NSwwLjM0NS0wLjM0NnYtNy4yNzRjMC0wLjE4OS0wLjE1NS0wLjM0NS0wLjM0NS0wLjM0NWgtNC4zNzljLTEuNjIzLDAtMy4wMjMtMS4xNDMtMy4zNDUtMi43MzQgIGMtMC44NTMtNC4xOTgtMi41LTguMTYxLTQuODk1LTExLjc4MWMtMC44OTYtMS4zNTMtMC43MTUtMy4xNSwwLjQzMi00LjI5N2wzLjEwOC0zLjEwOGMwLjExNi0wLjExNiwwLjExNi0wLjM3MiwwLjAwMi0wLjQ4OCAgbC01LjE0NC01LjE0NGMtMC4xMTYtMC4xMTYtMC4zNzItMC4xMTMtMC40ODgsMGwtMy4xMSwzLjExYy0xLjE0NywxLjE0Ny0yLjk0NCwxLjMyOC00LjI5NywwLjQzMiAgYy0zLjYyLTIuMzk0LTcuNTgzLTQuMDQzLTExLjc4MS00Ljg5NWMtMS41OTEtMC4zMjMtMi43MzQtMS43MjItMi43MzQtMy4zNDVWNjIuNjRjMC0wLjE4OS0wLjE1NS0wLjM0NS0wLjM0Ni0wLjM0NWgtNy4yNzQgIGMtMC4xOTEsMC0wLjM0NiwwLjE1NS0wLjM0NiwwLjM0NXY0LjM3OWMwLDEuNjIzLTEuMTQzLDMuMDIzLTIuNzM0LDMuMzQ1Yy00LjE5OCwwLjg1My04LjE2MSwyLjUtMTEuNzgxLDQuODk1ICBjLTEuMzUzLDAuODk2LTMuMTQ5LDAuNzE1LTQuMjk3LTAuNDMybC0zLjEwOC0zLjEwOGMtMC4xMTQtMC4xMTYtMC4zNzItMC4xMTYtMC40ODgtMC4wMDJsLTUuMTQ0LDUuMTQ0ICBjLTAuMTE0LDAuMTE2LTAuMTE0LDAuMzcyLDAsMC40ODhsMy4xMSwzLjExYzEuMTQ3LDEuMTQ3LDEuMzI4LDIuOTQ0LDAuNDMyLDQuMjk3Yy0yLjM5NCwzLjYyLTQuMDQzLDcuNTgzLTQuODk1LDExLjc4MSAgYy0wLjMyMywxLjU5MS0xLjcyMiwyLjczNC0zLjM0NSwyLjczNEg2MC4wOGMtMC4xODksMC0wLjM0NSwwLjE1NS0wLjM0NSwwLjM0NXY3LjI3NGMwLDAuMTkxLDAuMTU1LDAuMzQ2LDAuMzQ1LDAuMzQ2aDQuMzc5ICBjMS42MjMsMCwzLjAyMywxLjE0MywzLjM0NSwyLjczNGMwLjg1Myw0LjE5OCwyLjUsOC4xNjEsNC44OTUsMTEuNzgxYzAuODk2LDEuMzUzLDAuNzE1LDMuMTUtMC40MzIsNC4yOTdsLTMuMTA4LDMuMTA4ICBjLTAuMTE2LDAuMTE2LTAuMTE0LDAuMzc0LDAsMC40ODhsNS4xNDQsNS4xNDRjMC4xMzUsMC4xMzMsMC4zNTMsMC4xMzMsMC40ODgsMGwzLjEwOC0zLjEwOCAgQzc4LjU1OCwxMzEuMDIxLDc5LjQzMiwxMzAuNjgxLDgwLjMxMiwxMzAuNjgxeiBNMTAwLjY5MywxMTkuNjA4Yy05LjAxOCwwLTE2LjM1NS03LjMzNy0xNi4zNTUtMTYuMzU1czcuMzM3LTE2LjM1NSwxNi4zNTUtMTYuMzU1ICBzMTYuMzU1LDcuMzM3LDE2LjM1NSwxNi4zNTVTMTA5LjcxMSwxMTkuNjA4LDEwMC42OTMsMTE5LjYwOHogTTEwMC42OTMsOTMuNzI1Yy01LjI1NSwwLTkuNTI4LDQuMjc1LTkuNTI4LDkuNTI4ICBzNC4yNzUsOS41MjgsOS41MjgsOS41MjhzOS41MjgtNC4yNzUsOS41MjgtOS41MjhDMTEwLjIyMiw5OCwxMDUuOTQ4LDkzLjcyNSwxMDAuNjkzLDkzLjcyNXoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZFNjAwOyIgY3g9IjEwMC42OTMiIGN5PSIyMS4zMzMiIHI9IjE3LjA2NyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNjAyRjc1OyIgZD0iTTEwMC42OTMsNDEuODEzYy0xMS4yOTMsMC0yMC40OC05LjE4Ny0yMC40OC0yMC40OHM5LjE4Ny0yMC40OCwyMC40OC0yMC40OHMyMC40OCw5LjE4NywyMC40OCwyMC40OCAgUzExMS45ODYsNDEuODEzLDEwMC42OTMsNDEuODEzeiBNMTAwLjY5Myw3LjY4Yy03LjUyOCwwLTEzLjY1Myw2LjEyNS0xMy42NTMsMTMuNjUzczYuMTI1LDEzLjY1MywxMy42NTMsMTMuNjUzICBzMTMuNjUzLTYuMTI1LDEzLjY1My0xMy42NTNTMTA4LjIyMSw3LjY4LDEwMC42OTMsNy42OHoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZFNjAwOyIgY3g9IjEwMC42OTMiIGN5PSIxODEuNzYiIHI9IjE3LjA2NyIvPgo8cGF0aCBzdHlsZT0iZmlsbDojNjAyRjc1OyIgZD0iTTEwMC42OTMsMjAyLjI0Yy0xMS4yOTMsMC0yMC40OC05LjE4Ny0yMC40OC0yMC40OGMwLTExLjI5Myw5LjE4Ny0yMC40OCwyMC40OC0yMC40OCAgczIwLjQ4LDkuMTg3LDIwLjQ4LDIwLjQ4QzEyMS4xNzMsMTkzLjA1MywxMTEuOTg2LDIwMi4yNCwxMDAuNjkzLDIwMi4yNHogTTEwMC42OTMsMTY4LjEwN2MtNy41MjgsMC0xMy42NTMsNi4xMjUtMTMuNjUzLDEzLjY1MyAgYzAsNy41MjgsNi4xMjUsMTMuNjUzLDEzLjY1MywxMy42NTNzMTMuNjUzLTYuMTI1LDEzLjY1My0xMy42NTNDMTE0LjM0NywxNzQuMjMyLDEwOC4yMjEsMTY4LjEwNywxMDAuNjkzLDE2OC4xMDd6Ii8+CjxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRTYwMDsiIGN4PSIxODAuOTA3IiBjeT0iMTAxLjU0NyIgcj0iMTcuMDY3Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM2MDJGNzU7IiBkPSJNMTgwLjkwNywxMjIuMDI3Yy0xMS4yOTMsMC0yMC40OC05LjE4Ny0yMC40OC0yMC40OHM5LjE4Ny0yMC40OCwyMC40OC0yMC40OCAgYzExLjI5MywwLDIwLjQ4LDkuMTg3LDIwLjQ4LDIwLjQ4UzE5Mi4yLDEyMi4wMjcsMTgwLjkwNywxMjIuMDI3eiBNMTgwLjkwNyw4Ny44OTNjLTcuNTI4LDAtMTMuNjUzLDYuMTI1LTEzLjY1MywxMy42NTMgIHM2LjEyNSwxMy42NTMsMTMuNjUzLDEzLjY1M2M3LjUyOCwwLDEzLjY1My02LjEyNSwxMy42NTMtMTMuNjUzUzE4OC40MzUsODcuODkzLDE4MC45MDcsODcuODkzeiIvPgo8Zz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0VBMzQ1NzsiIGN4PSIyMC40OCIgY3k9IjEwMS41NDciIHI9IjE3LjA2NyIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0VBMzQ1NzsiIGQ9Ik0yMC40OCwxMjIuMDI3QzkuMTg3LDEyMi4wMjcsMCwxMTIuODQsMCwxMDEuNTQ3czkuMTg3LTIwLjQ4LDIwLjQ4LTIwLjQ4czIwLjQ4LDkuMTg3LDIwLjQ4LDIwLjQ4ICAgUzMxLjc3MywxMjIuMDI3LDIwLjQ4LDEyMi4wMjd6IE0yMC40OCw4Ny44OTNjLTcuNTI4LDAtMTMuNjUzLDYuMTI1LTEzLjY1MywxMy42NTNTMTIuOTUyLDExNS4yLDIwLjQ4LDExNS4yICAgczEzLjY1My02LjEyNSwxMy42NTMtMTMuNjUzUzI4LjAwOCw4Ny44OTMsMjAuNDgsODcuODkzeiIvPgo8L2c+CjxnPgoJPGVsbGlwc2Ugc3R5bGU9ImZpbGw6IzAwRTdGRjsiIGN4PSIxNTcuNDAzIiBjeT0iNDQuODM0IiByeD0iMTcuMDY3IiByeT0iMTcuMDY3Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDBFN0ZGOyIgZD0iTTE1Ny40MTMsNjUuMzA3Yy01LjQ3MiwwLTEwLjYxNC0yLjEzLTE0LjQ4MS01Ljk5OWMtMy44NjctMy44NjktNS45OTktOS4wMTEtNS45OTktMTQuNDgxICAgczIuMTMtMTAuNjEyLDUuOTk5LTE0LjQ4MWM3Ljk4NS03Ljk4NSwyMC45NzgtNy45ODQsMjguOTYyLDBjNy45ODUsNy45ODUsNy45ODUsMjAuOTc4LDAsMjguOTYyICAgQzE2OC4wMjYsNjMuMTc3LDE2Mi44ODMsNjUuMzA3LDE1Ny40MTMsNjUuMzA3eiBNMTU3LjQxMywzMS4xODFjLTMuNDk1LDAtNi45OTIsMS4zMzEtOS42NTUsMy45OTIgICBjLTUuMzIzLDUuMzIzLTUuMzIzLDEzLjk4NiwwLDE5LjMwOWM1LjMyMyw1LjMyMywxMy45ODYsNS4zMjMsMTkuMzA5LDBzNS4zMjMtMTMuOTg2LDAtMTkuMzA5ICAgQzE2NC40MDUsMzIuNTEsMTYwLjkxLDMxLjE4MSwxNTcuNDEzLDMxLjE4MXoiLz4KPC9nPgo8ZWxsaXBzZSBzdHlsZT0iZmlsbDojRkZFNjAwOyIgY3g9IjQzLjk3NyIgY3k9IjE1OC4yNTUiIHJ4PSIxNy4wNjciIHJ5PSIxNy4wNjciLz4KPHBhdGggc3R5bGU9ImZpbGw6IzYwMkY3NTsiIGQ9Ik00My45NzQsMTc4LjczOGMtNS4yNDUsMC0xMC40ODktMS45OTctMTQuNDgxLTUuOTg5Yy03Ljk4NS03Ljk4NS03Ljk4NS0yMC45NzgsMC0yOC45NjIgIGMzLjg2OS0zLjg2OSw5LjAxMS01Ljk5OSwxNC40ODEtNS45OTljNS40NzIsMCwxMC42MTQsMi4xMywxNC40ODEsNS45OTljMy44NjcsMy44NjksNS45OTksOS4wMTEsNS45OTksMTQuNDgxICBzLTIuMTMsMTAuNjEyLTUuOTk5LDE0LjQ4MUM1NC40NjMsMTc2Ljc0MSw0OS4yMTksMTc4LjczOCw0My45NzQsMTc4LjczOHogTTQzLjk3NCwxNDQuNjJjLTMuNDk3LDAtNi45OTQsMS4zMzEtOS42NTUsMy45OTIgIGMtNS4zMjMsNS4zMjMtNS4zMjMsMTMuOTg2LDAsMTkuMzA5YzUuMzIzLDUuMzIzLDEzLjk4NCw1LjMyNSwxOS4zMDksMGM1LjMyMy01LjMyMyw1LjMyMy0xMy45ODYsMC0xOS4zMDkgIEM1MC45NjYsMTQ1Ljk1MSw0Ny40NjksMTQ0LjYyLDQzLjk3NCwxNDQuNjJ6Ii8+CjxlbGxpcHNlIHN0eWxlPSJmaWxsOiNGRkU2MDA7IiBjeD0iNDMuOTgxIiBjeT0iNDQuODIzIiByeD0iMTcuMDY3IiByeT0iMTcuMDY3Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM2MDJGNzU7IiBkPSJNNDMuOTc0LDY1LjMwN2MtNS40NywwLTEwLjYxMi0yLjEzLTE0LjQ4MS01Ljk5OWMtNy45ODUtNy45ODUtNy45ODUtMjAuOTc4LDAtMjguOTYyICBzMjAuOTc4LTcuOTg1LDI4Ljk2MiwwYzMuODY5LDMuODY5LDUuOTk5LDkuMDExLDUuOTk5LDE0LjQ4MWMwLDUuNDcyLTIuMTMsMTAuNjE0LTUuOTk5LDE0LjQ4MVM0OS40NDQsNjUuMzA3LDQzLjk3NCw2NS4zMDd6ICAgTTQzLjk3NCwzMS4xODFjLTMuNDk3LDAtNi45OTQsMS4zMzEtOS42NTUsMy45OTJjLTUuMzIzLDUuMzIzLTUuMzIzLDEzLjk4NiwwLDE5LjMwOXMxMy45ODQsNS4zMjMsMTkuMzA5LDAgIGM1LjMyMy01LjMyMyw1LjMyMy0xMy45ODYsMC0xOS4zMDlDNTAuOTY2LDMyLjUxLDQ3LjQ2OSwzMS4xODEsNDMuOTc0LDMxLjE4MXoiLz4KPGc+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDBFN0ZGOyIgZD0iTTE3NS43ODcsMTg4LjU4N2MtMS44ODQsMC0zLjQxMy0xLjUyOS0zLjQxMy0zLjQxM3YtNi44MjdjMC0xLjg4NCwxLjUyOS0zLjQxMywzLjQxMy0zLjQxMyAgIGMxLjg4NCwwLDMuNDEzLDEuNTI5LDMuNDEzLDMuNDEzdjYuODI3QzE3OS4yLDE4Ny4wNTgsMTc3LjY3MSwxODguNTg3LDE3NS43ODcsMTg4LjU4N3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMwMEU3RkY7IiBkPSJNMTc1Ljc4NywxNjQuNjkzYy0xLjg4NCwwLTMuNDEzLTEuNTI5LTMuNDEzLTMuNDEzdi0xNy4wNjdjMC0xLjg4NCwxLjUyOS0zLjQxMywzLjQxMy0zLjQxMyAgIGMxLjg4NCwwLDMuNDEzLDEuNTI5LDMuNDEzLDMuNDEzdjE3LjA2N0MxNzkuMiwxNjMuMTY0LDE3Ny42NzEsMTY0LjY5MywxNzUuNzg3LDE2NC42OTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDBFN0ZGOyIgZD0iTTE3NS43ODcsMTMwLjU2Yy0xLjg4NCwwLTMuNDEzLTEuNTI5LTMuNDEzLTMuNDEzdi02LjgyN2MwLTEuODg0LDEuNTI5LTMuNDEzLDMuNDEzLTMuNDEzICAgYzEuODg0LDAsMy40MTMsMS41MjksMy40MTMsMy40MTN2Ni44MjdDMTc5LjIsMTI5LjAzMSwxNzcuNjcxLDEzMC41NiwxNzUuNzg3LDEzMC41NnoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMwMEU3RkY7IiBkPSJNMTg2LjAyNywxODguNTg3Yy0xLjg4NCwwLTMuNDEzLTEuNTI5LTMuNDEzLTMuNDEzdi02LjgyN2MwLTEuODg0LDEuNTI5LTMuNDEzLDMuNDEzLTMuNDEzICAgczMuNDEzLDEuNTI5LDMuNDEzLDMuNDEzdjYuODI3QzE4OS40NCwxODcuMDU4LDE4Ny45MTEsMTg4LjU4NywxODYuMDI3LDE4OC41ODd6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDBFN0ZGOyIgZD0iTTE4Ni4wMjcsMTY0LjY5M2MtMS44ODQsMC0zLjQxMy0xLjUyOS0zLjQxMy0zLjQxM3YtMTcuMDY3YzAtMS44ODQsMS41MjktMy40MTMsMy40MTMtMy40MTMgICBzMy40MTMsMS41MjksMy40MTMsMy40MTN2MTcuMDY3QzE4OS40NCwxNjMuMTY0LDE4Ny45MTEsMTY0LjY5MywxODYuMDI3LDE2NC42OTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDBFN0ZGOyIgZD0iTTE4Ni4wMjcsMTMwLjU2Yy0xLjg4NCwwLTMuNDEzLTEuNTI5LTMuNDEzLTMuNDEzdi02LjgyN2MwLTEuODg0LDEuNTI5LTMuNDEzLDMuNDEzLTMuNDEzICAgczMuNDEzLDEuNTI5LDMuNDEzLDMuNDEzdjYuODI3QzE4OS40NCwxMjkuMDMxLDE4Ny45MTEsMTMwLjU2LDE4Ni4wMjcsMTMwLjU2eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzAwRTdGRjsiIGQ9Ik0xODAuOTA3LDIwOS4wNjdjLTAuODM2LDAtMS42NzMtMC4zMDUtMi4zMy0wLjkxOGwtMjUuNi0yMy44OTMgICBjLTEuMzc5LTEuMjg1LTEuNDUyLTMuNDQ2LTAuMTY2LTQuODI1YzEuMjg1LTEuMzc3LDMuNDQ2LTEuNDUxLDQuODI1LTAuMTY2bDIzLjI3LDIxLjcxOWwyMy4yNy0yMS43MTkgICBjMS4zNzktMS4yODcsMy41MzgtMS4yMTIsNC44MjUsMC4xNjZjMS4yODcsMS4zNzksMS4yMTIsMy41MzgtMC4xNjYsNC44MjVsLTI1LjYsMjMuODkzICAgQzE4Mi41NzksMjA4Ljc2MSwxODEuNzQzLDIwOS4wNjcsMTgwLjkwNywyMDkuMDY3eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />

   </div>
  """

  edit: """
    <div class='fb-edit-section-header'>Trigger</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' list='triggers' />

	<datalist id="triggers">
	  <option value="ALARM"><!-- at the specified time (and date), trigger an alarm on the device, loading the current persona as context -->
	  <option value="INVOKE"><!-- open DNA and perform the invocation: Call, HTTP GET or POST, displaying results in a dialog with current persona as context -->
	  <option value="PUSH"><!-- initiate a push notification to this device - by device id - with the message specified and with this persona as context handler upon interaction -->
	  <option value="SEND"><!-- open DNA and submit the current act: autonomously if it immediately validates, otherwise let user complete the act -->
	  <option value="LOAD"><!-- open DNA and load the specified persona -->
	</datalist>

    <textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Set the Trigger Parameters - see DNA docs for accepted syntax.'></textarea>

<p><strong>Trigger Param Syntax</strong></p><ul><li>ALARM:<ul><li>HOURLY@MM,MM,..</li><li>DAILY@HH:MM,HH:MM,..</li><li>WEEKLY@DDD,DDD,..@HH:MM,HH:MM,..</li><li>DATE@dd/mm/YYYY@HH:MM,HH:MM,..</li><li><i>NB: You need to specify the hours in 24H format</i></li> </ul></li><li>INVOKE:<br /><ul><li>WEB:POST:URL</li><li>WEB:GET:URL</li><li>PHONE:CALL:ADDRESS</li><li>PHONE:SMS:ADDRESS:MESSAGE</li></ul></li><li>PUSH:<ul><li>MSG:MESSAGE</li><li>CHAN:CHANNEL:MESSAGE (msg pushed to all devices subscribed to this persona's
channel)</li></ul></li><li>SEND:<ul><li>AUTO&nbsp;</li><li>IAUTO (fallback to interactive if act can't validate autonomously)</li></ul></li><li>LOAD:<ul><li>SELF</li><li>PERSONA@PERSONA-URI</li></ul></li></ul><p>&nbsp;</p><p><em><strong>NOTE</strong>: To work effectively, it's required that apart from the "ALARM" triggers, all other triggers need to be coupled with an ALARM. That is, if you wish for the Persona to automatically wake up DNA and perform a SEND, then, in the persona spec, include a SEND trigger, and then an ALARM trigger to set when the SEND trigger ought be performed. Without the ALARM trigger included, a trigger only gets executed when the persona is activated the usual way.</em></p>

  """

  addButton: """
    <span class="symbol"><span class="fa fa-fire"></span></span> Trigger Field
  """