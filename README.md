# JS Excel

## Test task for JavaScript engineers

Here is a pure-JS application which provides Excel-like functionality in browser.


## Tasks

### 1. Run this project locally

This may require updating project dependencies.

### 2. Update project dependencies to fix all vulnerabilities

E.g.:
```bash
found 17 vulnerabilities (2 low, 8 moderate, 7 high)
```

### 3. Fix bugs

When you run project and open it in a browse, you will see Excel-like interface and format alight buttons 
and format text buttons (Bold, Italic, Underline), trash bin and formula-section.

There are some bugs with this toolbar:

1. You can enable text stile for a cell (**Bold**, *Italic*, <u>Underline</u>) but you can't disable it.
2. If you type text into the cell, select another cell and the return to the cell with text - 
this text will be disappeared in the formula panel.
3. Thrash bin button doesn't work - it's impossible to clean-up text and formatting in the table.

And some bug with the whole table:

1. It's impossible to select the whole row or column.
2. You can select a number of cells holding `Shift` button and pressing mouse `L-Button`, but you can't do the
same with arrows, and it's impossible to select a number of cells holding the `Control` button and pushing arrows.
3. Copy-Pasting doesn't work.

## Conclusion

1. It's not necessary to fix all the bugs. Just try to do as many, as you can.
2. Please, store your solution in the your-own repository and share its link to us.

