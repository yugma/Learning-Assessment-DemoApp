import { Component, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { Router, RouterEvent, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { TREE_DATA } from '../constants/menu-config';
import { AuthService } from '../services/auth.service';



/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {
  dataChange: BehaviorSubject<FileNode[]> = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(value: any, level: number): FileNode[] {
    let data: any[] = [];
    for (let k in value) {
      let v = value[k];
      let node = new FileNode();
      node.filename = `${k}`;
      if (v === null || v === undefined) {
        // no action
      } else if (typeof v === 'object') {
        node.children = this.buildFileTree(v, level + 1);
      } else {
        node.type = v;
      }
      data.push(node);
    }
    return data;
  }
}
@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css'],
  providers: [FileDatabase]
})
export class AppNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  url: string;
  nestedTreeControl: NestedTreeControl<FileNode>;

  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  private _getChildren = (node: FileNode) => { return observableOf(node.children); };

  hasNestedChild = (_: number, nodeData: FileNode) => { return !(nodeData.type); };
  constructor(
    private breakpointObserver: BreakpointObserver,
    private activateRoute: ActivatedRoute,
    private router: Router,
    database: FileDatabase,
    public authService: AuthService
  ) {

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.url = 'Home' + event.url.replace(/\//g, ' > ');
        }
      });
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }

}
